const Query = {
  users(parent, args, { db }, info) {
    if (!args.query) {
      return db.users;
    }

    return db.users.filter((user) => {
      return user.name.toLowerCase().includes(args.query.toLowerCase());
    });
  },
  comments(parent, args, { db }, info) {
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
