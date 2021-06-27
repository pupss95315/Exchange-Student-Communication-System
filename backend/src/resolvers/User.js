const User = {
  apply_list(parent, args, { db }, info) {
    return db.posts.filter((post) => {
      return post.author === parent.id;
    });
  },
};

export { User as default };
