const db = require("models/index");

module.exports = {
  getUser: async (user) => {
    const result = await db.User.findOne({
      where: { email: user.email },
    });
    if (result) {
      return result.dataValues;
    } else {
      throw new Error("Email is not exists");
    }
  },
  getRole: async (user) => {
    const newuser = await db.User.findOne({ where: { email: user.email } });
    const roleId = newuser.dataValues.role_id;
    const role = await db.Role.findOne({ where: { id: roleId } });
    const roleName = role.dataValues.name;
    return roleName;
  },
  createUser: async (user) => {
    const checkUser = await db.User.findOne({
      where: { email: user.email },
    });
    if (!checkUser) {
      const newUser = await db.User.create(user);
      return newUser;
    } else {
      throw new Error("Email existed");
    }
  },
};
