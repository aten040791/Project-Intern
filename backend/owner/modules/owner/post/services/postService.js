const db = require("models/index");
const { Op, Sequelize } = require("sequelize");

const postService = {
  list: () => {
    const posts = db.Post.findAll({
      include: [
        { model: db.Category, as: 'category', attributes: ['id', 'name'] },
        { model: db.Language, as: 'language', attributes: ['id', 'name', 'flag'] }
      ],
      order: [['createdAt', 'DESC']]
  });
    return posts;
  },

  getById: async (id) => {
    const post = await db.Post.findByPk(id, {
      include: [
        { model: db.Category, as: 'category', attributes: ['id', 'name'] },
        { model: db.Language, as: 'language', attributes: ['id', 'name', 'flag'] }
      ],
      order: [['createdAt', 'DESC']]
    });
    return post;
  },

  getByUid: async (uid, keyword, page, perPage) => {
    const whereClause = { user_id: uid };
  
    if (keyword) {
      whereClause[Op.or] = [
        Sequelize.literal(`MATCH(title, body) AGAINST('${keyword}' IN NATURAL LANGUAGE MODE)`)
      ];
    }
  
    const offset = (page - 1) * perPage;
    const limitOption = perPage;
  
    const { count, rows: posts } = await db.Post.findAndCountAll({
      where: whereClause,
      include: [
        { model: db.Category, as: 'category', attributes: ['id', 'name'] },
        { model: db.Language, as: 'language', attributes: ['id', 'name', 'flag'] }
      ],
      order: [['createdAt', 'DESC']],
      offset: offset,
      limit: limitOption
    });
  
    const totalPages = Math.ceil(count / perPage);
  
    return {
      posts: posts,
      limit: limitOption,
      offset: offset,
      totalPosts: count,
      totalPages: totalPages
    };
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

  delete: async (idsPost) => {
    await db.Post.destroy({ where: { id: idsPost } });
    return { message: "Posts deleted successfully" };
  },

  updateMultiple: async (Ids, updatedPostData) => {
    const posts = await db.Post.findAll({ where: { id: Ids } });
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
