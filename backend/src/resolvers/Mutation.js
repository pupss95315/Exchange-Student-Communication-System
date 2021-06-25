// import uuidv4 from 'uuid/v4.js';
import mongodb from 'mongodb'

const Mutation = {
  createUser(parent, {UID, password}, { db, pubsub }, info) {
    db.users.findOne({user_id: UID}, function(err, existuser) {
      // console.log(existuser)
      if (existuser) {
        throw new Error ('User already exist');
        console.log('User already exist');
        return existuser;
      } 
    });
    var user = new db.users({user_id: UID, password: password});
    console.log(user);
    user.save();

    return user;
  },
  createComment(parent, {UID, content}, { db, pubsub }, info) {
    db.users.findOne({user_id: UID}, function(err, user) {
      // console.log(user)
      if (!user) {
        throw new Error ('User not exist');
      } else {
        var comment = new db.comments({author: user._id, content: content});
        console.log(comment);
        comment.save();
    
        return comment;    
      }
    });
  },
  deleteComment(parent, args, { db, pubsub }, info) {
    db.comments.findOne({_id: mongodb.ObjectId(args.cmtId)}, function(err, comment) {
      console.log(comment);
      if (!comment) {
        // throw new Error ('Comment not exist');
        console.log("not exist");
        return "Comment not exist";
      } else {
        db.comments.deleteOne({_id: mongodb.ObjectId(args.cmtId)});
        console.log("success");
        return "Deleted successfully";
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
  // createComment(parent, args, { db, pubsub }, info) {
  //   const userExists = db.users.some((user) => user.id === args.data.author);
  //   const postExists = db.posts.some(
  //     (post) => post.id === args.data.post && post.published,
  //   );

  //   if (!userExists || !postExists) {
  //     throw new Error('Unable to find user and post');
  //   }

  //   const comment = {
  //     id: uuidv4(),
  //     ...args.data,
  //   };

  //   db.comments.push(comment);
  //   pubsub.publish(`comment ${args.data.post}`, {
  //     comment: {
  //       mutation: 'CREATED',
  //       data: comment,
  //     },
  //   });

  //   return comment;
  // },
  // deleteComment(parent, args, { db, pubsub }, info) {
  //   const commentIndex = db.comments.findIndex(
  //     (comment) => comment.id === args.id,
  //   );

  //   if (commentIndex === -1) {
  //     throw new Error('Comment not found');
  //   }

  //   const [deletedComment] = db.comments.splice(commentIndex, 1);
  //   pubsub.publish(`comment ${deletedComment.post}`, {
  //     comment: {
  //       mutation: 'DELETED',
  //       data: deletedComment,
  //     },
  //   });

  //   return deletedComment;
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
