const Query = {
  users(parent, args, { db }, info) {
    if (!args.UID) {
      return db.users;
    }

    return db.users.filter((user) => {
      return user.user_id===args.UID;
    });
  },
  comments(parent, { type, args }, { db }, info) {
    if (type === 'SELF') {
      return db.comments.filter
    }
    if (!args.query) {
      return db.comments;
    }

    return db.comments.filter((comment) => {
      const isBodyMatch = comment.body
        .toLowerCase()
        .includes(args.query.toLowerCase());
      return isBodyMatch;
    });
  },
  replies(parent, args, { db }, info) {
    return db.replies.filter((reply) => {
      return reply.comment === args.cmtId;
    });
  },
};

export { Query as default };
