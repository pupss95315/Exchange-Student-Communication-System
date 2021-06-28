import mongodb from 'mongodb'

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
    if (!args.type) {
      return db.comments.find({ group: args.group });
    }
    // return comments posted by a specified user
    if (args.type === 'SELF') {
      const user = await db.users.findOne({ user_id: args.data });
      const ret = await db.comments.find({ group: args.group, author: user._id });
      return ret;
    }
    // return comments containing specified keyword
    if (args.type === 'SEARCH') {
      const prefix = ".*";
      const ret = await db.comments.find({ group: args.group, content: { $regex: prefix.concat("", args.data).concat("", prefix) } });
      return ret;
    }
    // return comments followed by a specified user
    if (args.type === 'FOLLOW') {  
      const user = await db.users.findOne({ user_id: args.data });
      const ret = await db.comments.find({ group: args.group, followers: user._id });
      return ret;
    }
  },
};

export { Query as default };
