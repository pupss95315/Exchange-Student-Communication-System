// import uuidv4 from 'uuid/v4.js';
import mongodb from 'mongodb'

const Mutation = {
  createUser(parent, { UID, password, groupType }, { db, pubsub }, info) {
    db.users.findOne({user_id: UID}, function(err, existuser) {
      // console.log(existuser)
      if (existuser) {
        throw new Error ('User already exist');
        // console.log('User already exist');
        // return existuser;
      } 
    });
    var user = new db.users({user_id: UID, password: password, group: groupType});
    console.log(user);
    user.save();

    return user;
  },
  createComment(parent, args, { db, pubsub }, info) {
    db.users.findOne({user_id: args.UID}, function(err, user) {
      if (!user) {
        throw new Error ('User not exist');
      } 
      if (args.group && args.group !== user.group) {
        throw new Error ('User cannot leave comment in the other groups');
      }
      var comment = new db.comments({ author: user._id, ...args });
      console.log(comment);
      comment.save();
      return comment;
    });
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
  // updatePost(parent, args, { db, pubsub }, info) {
  //   const { id, data } = args;
  //   const post = db.posts.find((post) => post.id === id);
  //   const originalPost = { ...post };

  //   if (!post) {
  //     throw new Error('Post not found');
  //   }

  //   if (typeof data.title === 'string') {
  //     post.title = data.title;
  //   }

  //   if (typeof data.body === 'string') {
  //     post.body = data.body;
  //   }

  //   if (typeof data.published === 'boolean') {
  //     post.published = data.published;

  //     if (originalPost.published && !post.published) {
  //       pubsub.publish('post', {
  //         post: {
  //           mutation: 'DELETED',
  //           data: originalPost,
  //         },
  //       });
  //     } else if (!originalPost.published && post.published) {
  //       pubsub.publish('post', {
  //         post: {
  //           mutation: 'CREATED',
  //           data: post,
  //         },
  //       });
  //     }
  //   } else if (post.published) {
  //     pubsub.publish('post', {
  //       post: {
  //         mutation: 'UPDATED',
  //         data: post,
  //       },
  //     });
  //   }

  //   return post;
  // },
  // updateComment(parent, args, { db, pubsub }, info) {
  //   const { id, data } = args;
  //   const comment = db.comments.find((comment) => comment.id === id);

  //   if (!comment) {
  //     throw new Error('Comment not found');
  //   }

  //   if (typeof data.text === 'string') {
  //     comment.text = data.text;
  //   }

  //   pubsub.publish(`comment ${comment.post}`, {
  //     comment: {
  //       mutation: 'UPDATED',
  //       data: comment,
  //     },
  //   });

  //   return comment;
  // },
};

export { Mutation as default };
