const db = require("models/index");
const { Op, Sequelize } = require("sequelize");

module.exports = {
  // todo: selet * from users
  list: async () => {
    const users = await db.User.findAll({});
    if (users) return users;
    else throw new Error("Failed");
  },
  // todo: insert into user values(...)
  createUser: async (user) => {
    if (!user) throw new Error("User is required");
    const users = await db.User.create(user);
    if (users) return users;
    else throw new Error("Can't create user");
  },
  // todo: delete from users where id = userId
  deleteUser: async (ids) => {
    // if (!userId) throw new Error("ID is require");
    // const user = await db.User.destroy({
    //   where: userId,
    // });

    // if (user) return user;
    // else throw new Error("Can't Delete User");
    if (!Array.isArray(ids) || ids.length === 0)
      throw new Error("Array of user IDs is required");
    const users = await db.User.findAll({ where: { id: ids } });
    if (users.length === 0) throw new Error("No Users found");
    await db.User.destroy({ where: { id: ids } });
    return { message: "Users deleted successfully" };
  },
  updateUser: async (userId, user) => {
    if (!userId) throw new Error("ID is require");
    if (!user) throw new Error("User is require");

    const result = await db.update(user, {
      where: userId,
    });
    if (result) return result;
    else throw new Error("Can't update user");
  },
  searchUser: async (value) => {
    if (!value) throw new Error("Error");
    const valueLowCase = value.toLowerCase();
    const users = await db.User.findAll({
      where: {
        [Op.or]: [
          Sequelize.where(Sequelize.fn("lower", Sequelize.col("username")), {
            [Op.like]: `%${valueLowCase}%`,
          }),
          Sequelize.where(Sequelize.fn("lower", Sequelize.col("email")), {
            [Op.like]: `%${valueLowCase}%`,
          }),
        ],
      },
    });
    if (!users || users.length === 0) throw new Error("Users not found");
    return users;
  },
};
