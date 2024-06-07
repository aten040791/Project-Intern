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
    const newUser = await authService.createUser(req.body);
    return responseUtils.ok(res, newUser);
  },

  resPass: async (req, res) => {
    const { email, password } = req.body;
    const data = await authService.resetPassword(email, password);
    return responseUtils.ok(res, data);
  },
};

module.exports = authController;
