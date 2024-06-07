const { Op, Sequelize } = require("sequelize");

const where = async (keysearch, fields) => {
  const conditions = [
    Sequelize.literal(
      `MATCH(${fields}) AGAINST('${keysearch}' IN NATURAL LANGUAGE MODE)`
    ),
  ];
  return {
    where: {
      [Op.or]: conditions,
    },
  };
};

module.exports = where;
