const db = require("models/index");

const postService = {
  list: async () => {
    const posts = await db.Post.findAll();
    return posts;
  },

  create: async (post) => {
    const newPost = await db.Post.create(post);
    return newPost;
  },
};

module.exports = postService;
