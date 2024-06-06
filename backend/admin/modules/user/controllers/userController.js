const responseUtils = require("utils/responseUtils");
const userService = require("modules/user/services/userService");
const { hash } = require("kernels/hash/index");

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
      const hashPW = await hash(user.password, 10);
      user.password = hashPW;
      const newUser = await userService.createUser(user);
      return responseUtils.ok(res, { newuser: newUser });
    } catch (error) {
      return responseUtils.errorAdmin(res, error.message);
    }
  },
  // todo: delete a user
  deleteUser: async (req, res) => {
    // try {
    //   const userId = req.params;
    //   const userDeleted = await userService.deleteUser(userId);
    //   return responseUtils.ok(res, { Delete: "Successfull" });
    // } catch (error) {
    //   return responseUtils.errorAdmin(res, "Delete User Failed");
    // }
    try {
      const { id } = req.params;
      const idsArray = id.split(",");
      await userService.deleteUser(idsArray);
      return responseUtils.ok(res, { message: "Users deleted successfully" });
    } catch (error) {
      return responseUtils.errorAdmin(res, error.message);
    }
  },
  updateUser: async (req, res) => {
    try {
      const userId = req.params;
      const user = req.body;
      const newUser = await userService.updateUser(userId, user);
      return responseUtils.ok(res, { user: newUser });
    } catch (error) {
      return responseUtils.errorAdmin(res, error.message);
    }
  },
  searchUser: async (req, res) => {
    try {
      const { value } = req.query;
      const result = await userService.searchUser(value);
      return responseUtils.ok(res, { user: result });
    } catch (error) {
      return responseUtils.notFound(res);
    }
  },
};
