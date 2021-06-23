const Comment = {
  author(parent, args, { db }, info) {
    return db.users.find((user) => {
      return user.id === parent.author;
    });
  },
  replies(parent, args, { db }, info) {
    return db.replies.filter((comment) => {
      return comment.post === parent.id;
    });
  },
};

export { Comment as default };
