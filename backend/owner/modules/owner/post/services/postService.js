const db = require("models/index");
const { Op, Sequelize } = require("sequelize");

const postService = {
  list: () => {
    const posts = db.Post.findAll({
      include: [
        { model: db.Category, as: 'category', attributes: ['id', 'name'] },
        { model: db.Language, as: 'language', attributes: ['id', 'name', 'flag'] }
      ]
  });
    return posts;
  },

  getById: async (id) => {
    const post = await db.Post.findByPk(id, {
      include: [
        { model: db.Category, as: 'category', attributes: ['id', 'name'] },
        { model: db.Language, as: 'language', attributes: ['id', 'name', 'flag'] }
      ]
    });
    return post;
  },

  getByUid: async (uid) => {
    const post =  await db.Post.findAll({  
      where: { user_id: uid },
      include: [
        { model: db.Category, as: 'category', attributes: ['id', 'name'] },
        { model: db.Language, as: 'language', attributes: ['id', 'name', 'flag'] }
      ]
    });
    return post;
  },

  search: async (keyword) => {
    if (keyword.length < 3)
      throw new Error("Enter at least three keyword characters");
    const posts = await db.Post.findAll({
      where: {
        [Op.or]: [
          Sequelize.literal(
            `MATCH(title, body) AGAINST('${keyword}' IN NATURAL LANGUAGE MODE)`
          ),
        ],
      },
    });
    if (!posts || posts.length === 0) throw new Error("Post not found");
    return posts;
  },

  category: async (id) => {
    const category = await db.Post.findAll({ where: { category_id: id } });
    if (!category || category.length === 0) throw new Error("Haven't Post");
    return category;
  },

    create: async (post) => {
    const newPost = await db.Post.create(post);
    return newPost;
  },

  update: async (id, updatedPostData) => {
    const post = await db.Post.findByPk(id);
    await post.update(updatedPostData);
    return post;
  },

  delete: async (req) => {
    const posts = await db.Post.findAll({ where: { id: req.ids } });
    await db.Post.destroy({ where: { id: req.ids } });
    return { message: "Posts deleted successfully" };
  },

  updateMultiple: async (ids, updatedPostData) => {
    const posts = await db.Post.findAll({ where: { id: ids } });
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
