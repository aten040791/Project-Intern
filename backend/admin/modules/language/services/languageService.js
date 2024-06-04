const db = require("models/index");

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
    const language = await db.Language.create(lg);
    if (language) {
      return language;
    } else {
      throw new Error("Can not create this language");
    }
  },
  updateLanguage: async (id, lg) => {
    const language = await db.Language.update(lg, { where: id });
    if (language) {
      return language;
    } else {
      throw new Error("Can not update this language");
    }
  },
  deleteLanguage: async (id) => {
    const language = await db.Language.destroy({
      where: id,
    });
    if (language) {
      return language;
    } else {
      throw new Error("Can not delete this language");
    }
  },
};
