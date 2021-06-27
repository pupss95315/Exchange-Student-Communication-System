import mongodb from 'mongodb'

const Comment = {
  async author(parent, args, { db }, info) {
    // console.log("parent.author._id: ", parent.author._id);
    var ret = db.users.findOne({ _id: mongodb.ObjectId(parent.author._id) });
    return ret;
  },
  replies(parent, args, { db }, info) {
    return db.replies.find({ comment: parent.id });
  },
};

export { Comment as default };
