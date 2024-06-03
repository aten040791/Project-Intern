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

  create: async (post) => {
    if (!post.title || !post.content)
      throw new Error("Title and content are required");
    const newPost = await db.Post.create(post);
    return newPost;
  },

  update: async (id, updatedPostData) => {
    if (!id) throw new Error("Post ID is required");
    if (!updatedPostData.title && !updatedPostData.content) {
      throw new Error(
        "At least one field (title or content) is required for update"
      );
    }

    const post = await db.Post.findByPk(id);
    if (!post) throw new Error("Post not found");
    await post.update(updatedPostData);
    return post;
  },

  delete: async (ids) => {
    if (!Array.isArray(ids) || ids.length === 0)
      throw new Error("Array of post IDs is required");
    const posts = await db.Post.findAll({
      where: {
        id: ids,
      },
    });

    if (posts.length === 0) {
      throw new Error("No posts found");
    }

    await db.Post.destroy({
      where: {
        id: ids,
      },
    });

    return { message: "Posts deleted successfully" };
  },
};

module.exports = postService;
