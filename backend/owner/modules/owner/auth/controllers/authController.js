const authService = require("modules/owner/auth/services/authService");
const responseUtils = require("utils/responseUtils");

const authController = {
  signIn: async (req, res) => {
    try {
      const { email, password } = req.body;
      const data = await authService.login(email, password);
      return responseUtils.ok(res, data);
    } catch (error) {
      return responseUtils.userError(res, error.message);
    }
  },

  signUp: async (req, res) => {
    try {
      const { username, email, birthday, password, confirmPassword, address, role_id } = req.body;
      const newUser = await authService.createUser(username, email, birthday, password, confirmPassword, address, role_id);
      return responseUtils.ok(res, newUser);
    } catch (error) {
      return responseUtils.userError(res, error.message);
    }
  },

  resPass: async (req, res) => {
    try {
      const { email, password, confirmPassword } = req.body;
      const data = await authService.resetPassword(email, password, confirmPassword);
      return responseUtils.ok(res, data);
    } catch (error) {
      return responseUtils.userError(res, error.message);
    }
  },

};

module.exports = authController;
