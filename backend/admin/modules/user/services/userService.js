const db = require("models/index");
const { updateUser } = require("../controllers/userController");

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
  deleteUser: async (userId) => {
    if (!userId) throw new Error("ID is require");
    const user = await db.User.destroy({
      where: userId,
    });

    if (user) return user;
    else throw new Error("Can't Delete User");
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
};
