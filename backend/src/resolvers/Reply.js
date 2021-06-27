import mongodb from 'mongodb'

const Reply = {
  async author(parent, args, { db }, info) {
    var ret = await db.users.findOne({ _id: mongodb.ObjectId(parent.author._id) });
    return ret;
  },
  async comment(parent, args, { db }, info) {
    var ret = await db.comments.findOne({ _id: mongodb.ObjectId(parent.comment._id) });
    return ret;
  },
};

export { Reply as default };
