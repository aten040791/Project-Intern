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
  deleteLanguage: async (id) => {
    if (!id) throw new Error("ID is required");
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
