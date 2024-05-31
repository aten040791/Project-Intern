const db = require("models/index");

module.exports = {
  list: async () => {
    const categories = await db.Category.findAll({});
    return categories;
  },
  createCategory: async (ctg) => {
    const category = await db.Category.create(ctg);
    return category;
  },
  updateCategory: async (id, ctg) => {
    const category = await db.Category.update(ctg, { where: id });
    return category;
  },
  deleteCategory: async (id) => {
    const category = await db.Category.destroy({
      where: id,
    });
    return category;
  },
};
