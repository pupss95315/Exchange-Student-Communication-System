const Subscription = {
  comment: {
    subscribe(parent, args, { db, pubsub }, info){
      return pubsub.asyncIterator(`comment`);
    }
  },
  reply: {
    subscribe(parent, {CID}, { db, pubsub }, info) {
      // const comment = db.comments.findOne({ _id: CID });
      // console.log(comment)
      // if (!comment) {
      //   throw new Error('Comment not found');
      // }
      return pubsub.asyncIterator(`reply ${CID}`);
    },
  },
};

export { Subscription as default };
