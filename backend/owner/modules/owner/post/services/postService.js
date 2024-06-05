const db = require("models/index");

const postService = {
  list: async () => {
    const posts = await db.Post.findAll();
    return posts;
  },

  getById: async (id) => {
    if (!id) throw new Error("Post ID is required");
    const post = await db.Post.findByPk(id);
    if (!post) throw new Error("Post not found");
    return post;
  },

  category: async (id) => {
    if (!id) throw new Error("Category ID is required");
    const category = await db.Post.findAll({ where: { category_id: id } });
    if (!category || category.length === 0) throw new Error("Haven't Post");
    return category;
  },

  create: async (post) => {
    if (!post.title || !post.body)
      throw new Error("Title and body are required");
    const newPost = await db.Post.create(post);
    return newPost;
  },

  update: async (id, updatedPostData) => {
    if (!id) throw new Error("Post ID is required");
    const post = await db.Post.findByPk(id);
    if (!post) throw new Error("Post not found");
    await post.update(updatedPostData);
    return post;
  },

  delete: async (ids) => {
    if (!Array.isArray(ids) || ids.length === 0) throw new Error("Array of post IDs is required");
    const posts = await db.Post.findAll({ where: { id: ids } });
    if (posts.length === 0) throw new Error("No posts found");
    await db.Post.destroy({ where: { id: ids } });
    return { message: "Posts deleted successfully" };
  },

  updateMultiple: async (ids, updatedPostData) => {
    if (!ids || !Array.isArray(ids) || ids.length === 0) throw new Error("Array of post IDs is required");
    const posts = await db.Post.findAll({ where: { id: ids } });
    if (!posts || posts.length === 0) throw new Error("No posts found with the given IDs");
    const updatedPosts = [];
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      const updateData = {};
      updateData[updatedPostData.type] = updatedPostData.value;
      await post.update(updateData);
      updatedPosts.push(post);
    }
    return updatedPosts;
  },
};

module.exports = postService;
