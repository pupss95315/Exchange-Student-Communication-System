// import uuidv4 from 'uuid/v4.js';
import mongodb from 'mongodb'

const Mutation = {
  async createUser(parent, { UID, GPA, group }, { db, pubsub }, info) {
    const userExist = await db.users.findOne({user_id: UID});
    if (userExist) 
      throw new Error ('User already exist');
    var user = new db.users({user_id: UID, GPA: GPA, group: group});
    console.log(user);
    user.save();

    return user;
  },
  async updateUser(parent, { UID, data }, { db, pubsub }, info) {
    const user = await db.users.findOne({ user_id: UID });
    if (!user) {
      throw new Error ('User not exist');
    }
    db.users.updateOne({ user_id: UID }, { $set: { data } })
    
    return "success";
  },
  async createComment(parent, args, { db, pubsub }, info) {
    const user = await db.users.findOne({user_id: args.UID});
    if (!user) {
      throw new Error ('User not exist');
    } 
    if (args.group && args.group !== user.group) {
      throw new Error ('User cannot leave comment in the other groups');
    }
    var comment = new db.comments({ author: mongodb.ObjectId(user._id), ...args });
    console.log("comment: ", comment);
    comment.save();
    
    return comment;
  },
  async updateComment(parent, { CID, type, data }, { db, pubsub }, info) {
    const comment = await db.comments.findOne({_id: mongodb.ObjectId(CID)});
    // console.log(comment);
    if (!comment) {
      throw new Error ('Comment not exist');
    } 
    switch (type) {
      case "EDIT":
        await db.comments.updateOne({ _id: mongodb.ObjectId(CID) }, { $set: { content: data } })
        return "success";
      case "FOLLOW":
        if (await db.comments.findOne({ replies: { $in: data } })) {
          await db.comments.updateOne({ _id: mongodb.ObjectId(CID) }, { $pull: { followers: mongodb.ObjectId(data) } })
        } else {
          await db.comments.updateOne({ _id: mongodb.ObjectId(CID) }, { $push: { followers: mongodb.ObjectId(data) } })
        } 
        return "success";
      default:
        break;
    }
    return "success";
  },
  async deleteComment(parent, args, { db, pubsub }, info) {
    const comment = await db.comments.findOne({_id: mongodb.ObjectId(args.CID)});
    // console.log(comment);
    if (!comment) {
      throw new Error ('Comment not exist');
    }
    await db.comments.deleteOne({_id: mongodb.ObjectId(args.CID)});
    return "Comment deleted successfully";
  },
  async createReply(parent, { UID, CID, content }, { db, pubsub }, info) {
    const comment = await db.comments.findOne({ _id: mongodb.ObjectId(CID) });
    if (!comment)
      throw new Error ('comment not exist');
    const user = await db.users.findOne({ user_id: UID });
    if (!user)
      throw new Error ('User not exist');
    // if both author and parent comment are found, create a reply and return it
    var reply = new db.replies({author: user._id, comment: mongodb.ObjectId(CID),content: content});
    console.log(reply);
    reply.save();
    return reply;
  },
  async deleteReply(parent, args, { db, pubsub }, info) {
    const reply = await db.replies.findOne({_id: mongodb.ObjectId(args.RID)});
    console.log(reply);
    if (!reply) 
      throw new Error ('Reply not exist');
    await db.comments.deleteOne({_id: mongodb.ObjectId(args.RID)});
    var msg = "Reply deleted successfully";
    console.log(msg);
    return msg;
  },
  async updateReply(parent, { RID, content }, { db, pubsub }, info) {
    const reply = await db.replies.findOne({_id: mongodb.ObjectId(RID)});
    console.log(reply);
    if (!reply) 
      throw new Error ('Reply not exist');
    await db.replies.updateOne({ _id: mongodb.ObjectId(RID) }, { $set: { content: data } })
    return "success";
  },
};

export { Mutation as default };
