const db = require("models/index");

const siteService = {
  getCategory: async () => {
    const categories = await db.Category.findAll();
    return categories;
  },

  getLanguage: async () => {
    const languages = await db.Language.findAll();
    return languages;
  },
};

module.exports = siteService;
