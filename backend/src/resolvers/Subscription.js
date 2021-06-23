const Subscription = {
  comment: {
    subscribe(parent, { commentId }, { db, pubsub }, info) {
      const comment = db.comments.find(
        (comment) => comment.id === commentId && comment.published,
      );

      if (!comment) {
        throw new Error('Comment not found');
      }

      return pubsub.asyncIterator(`comment ${commentId}`);
    },
  },
};

export { Subscription as default };
