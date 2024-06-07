const where = require("modules/site/services/siteService");
const db = require("models/index");

module.exports = {
  search: async (apiName, keysearch) => {
    switch (apiName) {
      case "users": {
        const condition = await where(keysearch, "email, username, phone");
        const users = await db.User.findAll(condition);
        if (users.length != 0) return users;
        else throw new Error("User not found");
      }
      case "categories": {
        const condition = await where(keysearch, "name");
        const categories = await db.Category.findAll(condition);
        if (categories.length != 0) return categories;
        else throw new Error("Category not found");
      }
      case "languages": {
        const condition = await where(keysearch, "name");
        const languages = await db.Language.findAll(condition);
        if (languages.length != 0) return languages;
        else throw new Error("Language not found");
      }
      default:
        break;
    }
  },
};
