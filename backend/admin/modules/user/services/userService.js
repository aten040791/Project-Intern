const db = require("models/index");

module.exports = {
  // todo: selet * from users
  list: async () => {
    const users = await db.User.findAll({});
    return users;
  },
  // todo: insert into user values(...)
  createUser: async (user) => {
    const users = await db.User.create(user);
    return users;
  },
  // todo: delete from users where id = userId
  deleteUser: async (userId) => {
    const user = await db.User.destroy({
      where: userId,
    });
    return user;
  },
};
