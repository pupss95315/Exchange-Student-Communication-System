const Reply = {
  author(parent, args, { db }, info) {
    return db.users.find((user) => {
      return user.id === parent.author;
    });
  },
  comment(parent, args, { db }, info) {
    return db.comments.find((comment) => {
      return comment.id === parent.comment;
    });
  },
};

export { Reply as default };
