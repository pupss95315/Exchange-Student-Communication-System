const Query = {
  users(parent, args, { db }, info) {
    if (args.UID) {
      return [db.users.findOne({ user_id : args.UID })]
    }
    if (args.group) {
      return [db.users.findOne({ group : args.group })]
    }
    // if no filter, return all users
    return db.users;  
  },
  async comments(parent, args, { db }, info) {
    var comments = db.comments;
    if (args.group) {
      comments = db.comments.find({ group: args.group });
    } else { // if group is not specified, return comments in the main chat
      comments = db.comments.find({ group: null });
    }
    // return comments posted by a specified user
    if (args.type === 'SELF') {
      return comments.find({ author: args.data });
    }
    // return comments containing specified keyword
    if (args.type === 'SEARCH') {
      const prefix = ".*";
      return comments.find({ content: { $regex: prefix.concat("", args.data).concat("", prefix) } });
    }
    // return comments followed by a specified user
    if (args.type === 'FOLLOW') {  
      return comments.find({ followers: args.data });
    }
    return comments;
  },
  replies(parent, args, { db }, info) {
    // return all replies under a specified comment
    return db.replies.filter((reply) => {
      return reply.comment === args.cmtId;
    });
  },
};

export { Query as default };
