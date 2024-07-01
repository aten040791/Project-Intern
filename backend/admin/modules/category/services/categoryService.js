const db = require("models/index");
const { Op, Sequelize } = require("sequelize");

module.exports = {
  list: async (page, limit, search) => {
    const valueLowCase = search.toLowerCase();
    if (valueLowCase !== "") {
      var categories = await db.Category.findAll({
        where: {
          [Op.or]: [
            Sequelize.literal(
              `MATCH(name) AGAINST('${valueLowCase}' IN NATURAL LANGUAGE MODE)`
            ),
          ],
        },
      });
    } else {
      var categories = await db.Category.findAll({});
    }

    // pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const pages = Math.ceil(categories.length / limit);
    const result = categories.slice(startIndex, endIndex);

    return { result, pages };
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
