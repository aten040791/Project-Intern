const db = require("models/index");
const { Op, Sequelize } = require("sequelize");
const { uploads } = require("middlewares/multer");

module.exports = {
  list: async (page, limit, search) => {
    const valueLowCase = search.toLowerCase();
    if (valueLowCase !== "") {
      var languages = await db.Language.findAll({
        where: {
          [Op.or]: [
            Sequelize.literal(
              `MATCH(name) AGAINST('${valueLowCase}' IN NATURAL LANGUAGE MODE)`
            ),
          ],
        },
      });
    } else {
      var languages = await db.Language.findAll({});
    }

    // pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const pages = Math.ceil(languages.length / limit);
    const result = languages.slice(startIndex, endIndex);

    return { result, pages };
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
};
