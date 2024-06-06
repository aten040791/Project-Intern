const db = require("models/index");
const { Op, Sequelize } = require("sequelize");

module.exports = {
  list: async () => {
    const languages = await db.Language.findAll({});
    if (languages) {
      return languages;
    } else {
      throw new Error("Not found");
    }
  },
  createLanguage: async (lg) => {
    if (!lg) throw new Error("Language is require");
    const language = await db.Language.create(lg);
    if (language) {
      return language;
    } else {
      throw new Error("Can not create this language");
    }
  },
  updateLanguage: async (id, lg) => {
    if (!id) throw new Error("ID is required");
    if (!lg) throw new Error("Language is require");
    const language = await db.Language.update(lg, { where: id });
    if (language) {
      return language;
    } else {
      throw new Error("Can not update this language");
    }
  },
  deleteLanguage: async (ids) => {
    // if (!id) throw new Error("ID is required");
    // const language = await db.Language.destroy({
    //   where: id,
    // });
    // if (language) {
    //   return language;
    // } else {
    //   throw new Error("Can not delete this language");
    // }
    if (!Array.isArray(ids) || ids.length === 0)
      throw new Error("Array of Language IDs is required");
    const languages = await db.Language.findAll({ where: { id: ids } });
    if (languages.length === 0) throw new Error("No Languages found");
    await db.Language.destroy({ where: { id: ids } });
    return { message: "Languages deleted successfully" };
  },
  searchLanguage: async (value) => {
    if (!value) throw new Error("Error");
    const valueLowCase = value.toLowerCase();
    const languages = await db.Language.findAll({
      where: {
        [Op.or]: [
          Sequelize.where(Sequelize.fn("lower", Sequelize.col("name")), {
            [Op.like]: `%${valueLowCase}%`,
          }),
        ],
      },
    });
    if (!languages || languages.length === 0)
      throw new Error("Languages not found");
    return languages;
  },
};
