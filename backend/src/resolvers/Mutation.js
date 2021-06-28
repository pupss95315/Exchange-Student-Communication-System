// import uuidv4 from 'uuid/v4.js';
import mongodb from 'mongodb'

const Mutation = {
  async createUser(parent, { UID, GPA, group }, { db, pubsub }, info) {
    const userExist = await db.users.findOne({user_id: UID});
    if (userExist) {
      throw new Error ('User already exist');
    } 
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
    var currenttime = new Date();
    console.log("current time: ", currenttime);
    var comment = new db.comments({ author: mongodb.ObjectId(user._id), datetime: currenttime, ...args });
    console.log("comment: ", comment);
    comment.save();

    pubsub.publish('comment', {
      comment: {
        mutation: 'CREATED',
        data: comment,
      },
    });
    
    return comment;
  },
  async updateComment(parent, { CID, type, data }, { db, pubsub }, info) {
    console.log("update comment")
    const comment = await db.comments.findOne({_id: CID});
    // console.log(comment);
    if (!comment) {
      throw new Error ('Comment not exist');
    } 
    switch (type) {
      case "EDIT":
        await db.comments.updateOne({ _id: CID }, { $set: { content: data } })
      case "FOLLOW":
        const follower = await db.users.findOne({ user_id: data });
        const isFollow = await db.comments.findOne({ followers: follower._id })
        if (isFollow) {
          await db.comments.updateOne({ _id: CID }, { $pull: { followers: follower._id } })
        } else {
          await db.comments.updateOne({ _id: CID }, { $push: { followers: follower._id } })
        } 
      default:
        break;
    }

    pubsub.publish('comment', {
      comment: {
        mutation: 'UPDATE',
        data: comment,
      },
    });

    return "success";
  },
  async deleteComment(parent, { CID }, { db, pubsub }, info) {
    const comment = await db.comments.findOne({ _id: CID });
    // console.log(comment);
    if (!comment) {
      throw new Error ('Comment not exist');
    }

    // delete all replies under the comment
    await db.replies.deleteMany({ comment: CID });

    // delete the comment itself
    await db.comments.deleteOne({ _id: CID });
    
    pubsub.publish('comment', {
      comment: {
        mutation: 'DELETE',
        data: comment,
      },
    });

    return "success";
  },
  async createReply(parent, { UID, CID, content }, { db, pubsub }, info) {
    const comment = await db.comments.findOne({ _id: CID });
    if (!comment) {
      throw new Error ('comment not exist');
    }
    const user = await db.users.findOne({ user_id: UID });
    if (!user) {
      throw new Error ('User not exist');
    }
    // if both author and parent comment are found, create a reply and return it
    var currenttime = new Date();
    console.log("current time: ", currenttime);
    var reply = new db.replies({ author: user._id, comment: CID, content: content, datetime: currenttime });
    console.log(reply);
    reply.save();

    pubsub.publish(`reply`, {
      reply: {
        mutation: 'CREATED',
        data: reply
      }
    })

    console.log("Create reply")

    return reply;
  },
  async deleteReply(parent, { RID }, { db, pubsub }, info) {
    const reply = await db.replies.findOne({ _id: RID });
    if (!reply) {
      throw new Error ('Reply not exist');
    }
    await db.replies.deleteOne({ _id: RID });

    pubsub.publish(`reply`, {
      reply: {
        mutation: 'DELETED',
        data: reply
      }
    })
    var msg = "success";
    console.log(msg);
    return msg;
  },
  async updateReply(parent, { RID, content }, { db, pubsub }, info) {
    const reply = await db.replies.findOne({ _id: RID });
    console.log(reply);
    if (!reply) {
      throw new Error ('Reply not exist');
    }
    await db.replies.updateOne({ _id: RID }, { $set: { content: content } })

    pubsub.publish(`reply`, {
      reply: {
        mutation: 'UPDATED',
        data: reply
      }
    })

    return "success";
  },
};

export { Mutation as default };
