const db = require("models/index");
const { Op, Sequelize } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = {
  // todo: selet * from users
  list: async () => {
    const users = await db.User.findAll({});
    if (users) return users;
    else throw new Error("Failed");
  },
  // todo: insert into user values(...)
  createUser: async (user) => {
    const hashPW = await bcrypt.hash(user.password, 10);
    user.password = hashPW;
    const users = await db.User.create(user);
    return users;
  },
  // todo: delete from users where id = userId
  deleteUser: async (ids) => {
    const users = await db.User.findAll({ where: { id: ids } });
    if (users.length === 0) throw new Error("No Users found");
    await db.User.destroy({ where: { id: ids } });
    return { message: "Users deleted successfully" };
  },
  updateUser: async (userId, user) => {
    const hashPW = await bcrypt.hash(user.password, 10);
    user.password = hashPW;
    const result = await db.User.update(user, {
      where: userId,
    });
    return result;
  },
  // searchUser: async (value) => {
  //   if (value.length < 3) throw new Error("Enter at least 3 characteres");
  //   const valueLowCase = value.toLowerCase();
  //   const users = await db.User.findAll({
  //     where: {
  //       [Op.or]: [
  //         Sequelize.literal(
  //           `MATCH(username, email, phone) AGAINST('${valueLowCase}' IN NATURAL LANGUAGE MODE)`
  //         ),
  //       ],
  //     },
  //   });
  //   if (!users || users.length === 0) throw new Error("Users not found");
  //   return users;
  // },
};
