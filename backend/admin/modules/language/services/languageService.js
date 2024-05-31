const db = require("models/index");

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
  deleteLanguage: async (id) => {
    const language = await db.Language.destroy({
      where: id,
    });
    return language;
  },
};
