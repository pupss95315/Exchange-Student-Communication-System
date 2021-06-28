const Query = {
  async users(parent, args, { db }, info) {
    if (args.UID) {
      const ret = [await db.users.findOne({ user_id : args.UID })];
      return ret;
    }
    if (args.group) {
      const ret = [await db.users.findOne({ group : args.group })];
      return ret;
    }
    // if no filter, return all users
    return db.users;  
  },
  async comments(parent, args, { db }, info) {
    console.log(true)
    if (args.CID) {
      const ret = await db.comments.findOne({ _id: args.CID });
      console.log(ret)
      return [ret];
    }
    var comments = db.comments;
    if (args.group) {
      comments = await db.comments.find({ group: args.group });
    } else { // if group is not specified, return comments in the main chat
      comments = await db.comments.find({ group: null });
    }
    if (!args.type) {
      return comments;
    }
    // return comments posted by a specified user
    if (args.type === 'SELF') {
      const ret = await comments.find({ author: args.data });
      return ret;
    }
    // return comments containing specified keyword
    if (args.type === 'SEARCH') {
      const prefix = ".*";
      const ret = await comments.find({ content: { $regex: prefix.concat("", args.data).concat("", prefix) } });
      return ret;
    }
    // return comments followed by a specified user
    if (args.type === 'FOLLOW') {  
      const ret = await comments.find({ followers: args.data });
      return ret;
    }
  },
};

export { Query as default };
