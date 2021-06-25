const Query = {
  users(parent, args, { db }, info) {
    if (!args.UID) {
      return db.users;
    }
    return [db.users.findOne({user_id : args.UID})]
  },
  comments(parent, { type, data }, { db }, info) {
    if (type === 'SELF') {
      return db.comments.find({ author: data });
    }
    if (type === 'SEARCH') {
      const prefix = ".*";
      return db.comments.find({ content: { $regex: prefix.concat("", data).concat("", prefix) } });
    }
    if (type === 'FOLLOW') {  
      return db.comments.find({ followers: data });
    }
  },
  replies(parent, args, { db }, info) {
    return db.replies.filter((reply) => {
      return reply.comment === args.cmtId;
    });
  },
};

export { Query as default };
