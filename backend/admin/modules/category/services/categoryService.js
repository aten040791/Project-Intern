const db = require("models/index");

module.exports = {
  list: async () => {
    const categories = await db.Category.findAll({});
    return categories;
  },
  createCategory: async (ctg) => {
    const category = await db.Category.create(ctg);
    if (category) {
      return category;
    } else {
      throw new Error("Can't create this category");
    }
  },
  updateCategory: async (id, ctg) => {
    const category = await db.Category.update(ctg, { where: id });
    if (category) {
      return category;
    } else {
      throw new Error("Can't update this category");
    }
  },
  deleteCategory: async (id) => {
    const category = await db.Category.destroy({
      where: id,
    });
    if (category) {
      return category;
    } else {
      throw new Error("Can't delete this category");
    }
  },
};
