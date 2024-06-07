const responseUtils = require("utils/responseUtils");
const { getApiName } = require("utils/apiUtils");
const userService = require("modules/user/services/userService");
const { hash } = require("kernels/hash/index");
const siteController = require("modules/site/controllers/siteController");

module.exports = {
  // todo: get all user
  index: async (req, res) => {
    try {
      const result = await userService.list();
      return responseUtils.ok(res, { users: result });
    } catch (error) {
      return responseUtils.notFound(res);
    }
    // try {
    //   const result = await userService.list();
    //   res.render("index", {
    //     result,
    //     layout: "admin/views/layouts/front-page",
    //   });
    // } catch (error) {
    //   return responseUtils.notFound(res);
    // }
  },
  // todo: create a user
  createUser: async (req, res) => {
    const user = req.body;
    const hashPW = await hash(user.password, 10);
    user.password = hashPW;
    const newUser = await userService.createUser(user);
    return responseUtils.ok(res, { newuser: newUser });
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
    const { ids } = req.body;
    const idsArray = ids.split(",");
    await userService.deleteUser(idsArray);
    return responseUtils.ok(res, { message: "Users deleted successfully" });
  },
  updateUser: async (req, res) => {
    const userId = req.params;
    const user = req.body;
    const hashPW = await hash(user.password, 10);
    user.password = hashPW;
    const newUser = await userService.updateUser(userId, user);
    return responseUtils.ok(res, { user: newUser });
  },
  searchUser: async (req, res) => {
    try {
      const { keysearch } = req.query;
      // const result = await userService.searchUser(keysearch);
      // return responseUtils.ok(res, { user: result });
      const apiName = getApiName(req.originalUrl);
      const result = await siteController.search(apiName, keysearch);
      return responseUtils.ok(res, { users: result });
    } catch (error) {
      return responseUtils.errorAdmin(res, error.message);
    }
  },
};
