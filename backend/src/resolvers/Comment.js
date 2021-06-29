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
  async followers(parent, args, { db }, info) {
    var follower_id = parent.followers
    var ret = await db.users.find({ _id: {"$in": follower_id}});
    return ret;
  }
};

export { Comment as default };
