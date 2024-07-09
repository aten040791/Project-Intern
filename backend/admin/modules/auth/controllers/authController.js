const authService = require("modules/auth/services/authService");
const responseUtils = require("utils/responseUtils");

module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const data = await authService.login(email, password);
      return responseUtils.ok(res, data);
    } catch (error) {
      return responseUtils.errorAdmin(res, error.message);
    }
  },
  getAdmin: async (req, res) => {
    const admin = await authService.getAdmin(req, res, next);
    // return responseUtils.ok(res, data);
  },
};
