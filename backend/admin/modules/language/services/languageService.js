const db = require("models/index");
const { Op, Sequelize } = require("sequelize");

module.exports = {
  list: async () => {
    const languages = await db.Language.findAll({});
    return languages;
  },
  createLanguage: async (lg) => {
    const language = await db.Language.create(lg);
    return language;
  },
  updateLanguage: async (id, lg) => {
    const language = await db.Language.update(lg, { where: id });
    return language;
  },
  deleteLanguage: async (ids) => {
    await db.Language.destroy({ where: { id: ids } });
  },
  // searchLanguage: async (value) => {
  //   if (!value) throw new Error("Error");
  //   if (valueLowCase.length < 3) throw new Error("Enter at least 3 characters");
  //   const valueLowCase = value.toLowerCase();
  //   const languages = await db.Language.findAll({
  //     where: {
  //       [Op.or]: [
  //         Sequelize.literal(
  //           `MATCH(name) AGAINST('${valueLowCase}' IN NATURAL LANGUAGE MODE)`
  //         ),
  //       ],
  //     },
  //   });
  //   if (!languages || languages.length === 0)
  //     throw new Error("Languages not found");
  //   return languages;
  // },
};
