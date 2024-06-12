const db = require("models/index");
const { Op, Sequelize } = require("sequelize");

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
  deleteCategory: async (ids) => {
    await db.Category.destroy({ where: { id: ids } });
  },
  // searchCategory: async (value) => {
  //   if (!value) throw new Error("Error");
  //   // const valueLowCase = value.toLowerCase();
  //   const categories = await db.Category.findAll({
  //     where: {
  //       [Op.or]: [
  //         Sequelize.literal(
  //           `MATCH(name) AGAINST('${value}' IN NATURAL LANGUAGE MODE)`
  //         ),
  //       ],
  //     },
  //   });
  //   console.log(categories);
  //   if (!categories || categories.length === 0)
  //     throw new Error("Categories not found");
  //   return categories;
  // },
};
