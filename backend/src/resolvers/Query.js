const Query = {
  users(parent, args, { db }, info) {
    if (!args.UID) {
      return db.users;
    }
    return [db.UserModel.findOne({user_id : args.UID})]
  },
  comments(parent, { type, args }, { db }, info) {
    if (type === 'SELF') {
      return db.comments.find((comment) => {
        return comment.author == args.data;
      });
    }
    if (type === 'FOLLOW') {
      return db.comments.find((comment) => {
        comment.followers.includes(args.data);
      });
    }
    if (type === 'SEARCH') {  
      return db.comments.find((comment) => {
        const isBodyMatch = comment.body
          .toLowerCase()
          .includes(args.query.toLowerCase());
        return isBodyMatch;
      });
    }
  },
  replies(parent, args, { db }, info) {
    return db.replies.filter((reply) => {
      return reply.comment === args.cmtId;
    });
  },
};

export { Query as default };
