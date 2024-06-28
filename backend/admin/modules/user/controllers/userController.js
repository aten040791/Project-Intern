const responseUtils = require("utils/responseUtils");
const { getApiName } = require("utils/apiUtils");
const userService = require("modules/user/services/userService");
const siteController = require("modules/site/controllers/siteController");

module.exports = {
  // todo: get all user
  index: async (req, res) => {
    const { page, limit } = req.query;
    const result = await userService.list(page, limit);
    return responseUtils.ok(res, { users: result });
  },
  // todo: create a user
  createUser: async (req, res) => {
    const user = req.body;
    const newUser = await userService.createUser(user);
    return responseUtils.ok(res, { newuser: newUser });
  },
  // todo: delete a user
  deleteUser: async (req, res) => {
    // try {
    const { ids } = req.body;
    await userService.deleteUser(ids);
    return responseUtils.ok(res, { Delete: "Successfull" });
    // } catch (error) {
    //   return responseUtils.errorAdmin(res, "Delete User Failed");
    // }
    // const { ids } = req.body;
    // const idsArray = ids.split(",");
    // await userService.deleteUser(idsArray);
    // return responseUtils.ok(res, { message: "Users deleted successfully" });
  },
  updateUser: async (req, res) => {
    const userId = req.params;
    const user = req.body;
    await userService.updateUser(userId, user);
    return responseUtils.ok(res, { user: "Update successfull" });
  },
  searchUser: async (req, res) => {
    try {
      const { search } = req.query;
      // const result = await userService.searchUser(keysearch);
      // return responseUtils.ok(res, { user: result });
      const apiName = getApiName(req.originalUrl); // req.originalUrl = user or languages or categories
      const result = await siteController.search(apiName, search);
      return responseUtils.ok(res, { users: result });
    } catch (error) {
      return responseUtils.errorAdmin(res, error.message);
    }
  },
};
