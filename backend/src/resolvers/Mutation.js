// import uuidv4 from 'uuid/v4.js';
import mongodb from 'mongodb'

const Mutation = {
  createUser(parent, { UID, GPA, group }, { db, pubsub }, info) {
    db.users.findOne({user_id: UID}, function(err, existuser) {
      if (existuser) {
        throw new Error ('User already exist');
        // console.log('User already exist');
        // return existuser;
      } 
    });
    var user = new db.users({user_id: UID, GPA: GPA, group: group});
    console.log(user);
    user.save();

    return user;
  },
  updateUser(parent, { UID, data }, { db, pubsub }, info) {
    db.users.findOne({ user_id: UID }, function(err, user) {
      if (!user) {
        throw new Error ('User not exist');
      } 
    });
    db.users.updateOne({ user_id: UID }, { $set: { data } })
    
    return "success";
  },
  createComment(parent, args, { db, pubsub }, info) {
    var u_id;
    db.users.findOne({user_id: args.UID}, function(err, user) {
      if (!user) {
        throw new Error ('User not exist');
      } 
      if (args.group && args.group !== user.group) {
        throw new Error ('User cannot leave comment in the other groups');
      }
      u_id = user._id;
    });
    var comment = new db.comments({ author: u_id, ...args });
    console.log(comment);
    comment.save();
    
    return comment;
  },
  updateComment(parent, { CID, type, data }, { db, pubsub }, info) {
    db.comments.findOne({_id: mongodb.ObjectId(CID)}, function(err, comment) {
      console.log(comment);
      if (!comment) {
        throw new Error ('Comment not exist');
      } 
      switch (type) {
        case "EDIT":
          db.comments.updateOne({ _id: mongodb.ObjectId(CID) }, { $set: { content: data } })
          return "success";
        case "FOLLOW":
          if (db.comments.findOne({ replies: { $in: data } })) {
            db.comments.updateOne({ _id: mongodb.ObjectId(CID) }, { $pull: { followers: mongodb.ObjectId(data) } })
          } else
            db.comments.updateOne({ _id: mongodb.ObjectId(CID) }, { $push: { followers: mongodb.ObjectId(data) } })
          return "success";
        default:
          break;
      }
    });    
    return "success";
  },
  deleteComment(parent, args, { db, pubsub }, info) {
    db.comments.findOne({_id: mongodb.ObjectId(args.CID)}, function(err, comment) {
      console.log(comment);
      if (!comment) {
        throw new Error ('Comment not exist');
        // var msg = "Comment not exist";
        // console.log(msg);
        // return msg;
      } else {
        db.comments.deleteOne({_id: mongodb.ObjectId(args.CID)});
        var msg = "Comment deleted successfully";
        console.log(msg);
        return msg;
      }
    });
  },
  createReply(parent, { UID, CID, content }, { db, pubsub }, info) {
    db.comments.findOne({ _id: mongodb.ObjectId(CID) }, function(err, comment) {
      if (!comment)
        throw new Error ('comment not exist');
    });
    db.users.findOne({ user_id: UID }, function(err, user) {
      if (!user)
        throw new Error ('User not exist');
      // if both author and parent comment are found, create a reply and return it
      var reply = new db.replies({author: user._id, comment: mongodb.ObjectId(CID),content: content});
      console.log(reply);
      reply.save();
      return reply;
    });
  },
  deleteReply(parent, args, { db, pubsub }, info) {
    db.replies.findOne({_id: mongodb.ObjectId(args.RID)}, function(err, comment) {
      console.log(reply);
      if (!reply) {
        throw new Error ('Reply not exist');
        // var msg = "Reply not exist";
        // console.log(msg);
        // return msg;
      } else {
        db.comments.deleteOne({_id: mongodb.ObjectId(args.RID)});
        var msg = "Reply deleted successfully";
        console.log(msg);
        return msg;
      }
    });
  },
  updateReply(parent, { RID, content }, { db, pubsub }, info) {
    db.replies.findOne({_id: mongodb.ObjectId(RID)}, function(err, reply) {
      console.log(reply);
      if (!reply) {
        throw new Error ('Reply not exist');
      } 
      db.replies.updateOne({ _id: mongodb.ObjectId(RID) }, { $set: { content: data } })
      return "success";
    });    
  },
};

export { Mutation as default };
