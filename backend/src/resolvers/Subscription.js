const Subscription = {
  reply: {
    subscribe(parent, { CID }, { db, pubsub }, info) {
      const comment = db.comments.find({ _id: CID });
      if (!comment) {
        throw new Error('Comment not found');
      }

      return pubsub.asyncIterator(`reply ${ CID }`);
    },
  },
};

export { Subscription as default };
