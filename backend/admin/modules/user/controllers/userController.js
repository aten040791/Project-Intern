const responseUtils = require("utils/responseUtils");
const userService = require("modules/user/services/userService");

module.exports = {
  // todo: get all user
  index: async (req, res) => {
    try {
      const result = await userService.list();
      return responseUtils.ok(res, { users: result });
    } catch (error) {
      return responseUtils.notFound(res);
    }
  },
  // todo: create a user
  createUser: async (req, res) => {
    try {
      const user = req.body;
      const newUser = await userService.createUser(user);
      return responseUtils.ok(res, { newuser: newUser });
    } catch (error) {
      return responseUtils.notFound(res);
    }
  },
  // todo: delete a user
  deleteUser: async (req, res) => {
    try {
      const userId = req.params;
      const userDeleted = await userService.deleteUser(userId);
      return responseUtils.ok(res, { numberUserDeleted: userDeleted });
    } catch (error) {
      return responseUtils.notFound(res);
    }
  },
};
