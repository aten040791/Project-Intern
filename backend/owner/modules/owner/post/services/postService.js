const db = require("models/index");

const postService = {
  list: async () => {
    const posts = await db.Post.findAll();
    return posts;
  },

  getById: async (id) => {
    const post = await db.Post.findByPk(id);
    return post;
  },

  create: async (post) => {
    const newPost = await db.Post.create(post);
    return newPost;
  },

  update: async (id, updatedPostData) => {
    const post = await db.Post.findByPk(id);
    if (!post) throw new Error('Post not found');
    await post.update(updatedPostData);
    return post;
  },

  delete: async (id) => {
    const post = await db.Post.findByPk(id);
    if (!post) throw new Error('Post not found');
    await post.destroy();
    return { message: 'Post deleted successfully' };
  },
};

module.exports = postService;
