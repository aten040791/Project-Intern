const db = require("models/index");

module.exports = {
  list: async () => {
    const categories = await db.Category.findAll({});
    return categories;
  },
  createCategory: async (ctg) => {
    if (!ctg) {
      throw new Error("Category is required");
    }
    const category = await db.Category.create(ctg);
    if (category) {
      return category;
    } else {
      throw new Error("Can't create this category");
    }
  },
  updateCategory: async (id, ctg) => {
    if (!id) throw new Error("ID is required");
    if (!ctg) throw new Error("Catagory is required");
    const category = await db.Category.update(ctg, { where: id });
    if (category) {
      return category;
    } else {
      throw new Error("Can't update this category");
    }
  },
  deleteCategory: async (ids) => {
    // if (!id) throw new Error("ID is required");
    // const category = await db.Category.destroy({
    //   where: id,
    // });
    // if (category) {
    //   return category;
    // } else {
    //   throw new Error("Can't delete this category");
    // }
    if (!Array.isArray(ids) || ids.length === 0)
      throw new Error("Array of category IDs is required");
    const categories = await db.Category.findAll({ where: { id: ids } });
    if (categories.length === 0) throw new Error("No Categories found");
    await db.Category.destroy({ where: { id: ids } });
    return { message: "Categories deleted successfully" };
  },
  searchCategory: async (value) => {
    if (!value) throw new Error("Error");
    const valueLowCase = value.toLowerCase();
    const categories = await db.Category.findAll({
      where: { name: valueLowCase },
    });
    if (!categories || categories.length === 0)
      throw new Error("Categories not found");
    return categories;
  },
};
