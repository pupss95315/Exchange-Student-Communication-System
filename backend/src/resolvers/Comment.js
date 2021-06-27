import mongodb from 'mongodb'

const Comment = {
  async author(parent, args, { db }, info) {
    var ret = await db.users.findOne({ _id: mongodb.ObjectId(parent.author._id) });
    return ret;
  },
  async replies(parent, args, { db }, info) {
    var ret = await db.replies.find({ comment: parent.id });
    return ret;
  },
};

export { Comment as default };
