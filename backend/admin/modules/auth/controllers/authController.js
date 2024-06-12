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
  // verifi token done
  // getUser: async (req, res, next) => {
  //   const user = req.user;
  //   if (user) {
  //     return responseUtils.ok(res, { data: user });
  //   } else {
  //     return responseUtils.notFound(res);
  //   }
  // },
  // register
  // ! wrong
  // register: async (req, res) => {
  //   try {
  //     const user = req.body;
  //     const newUser = await authService.createUser(user);
  //     return responseUtils.ok(res, { user: newUser });
  //   } catch (error) {
  //     return responseUtils.invalidated(res, "Error Sign Up");
  //   }
  // },
  // newAccessToken: async (req, res) => {
  //   try {
  //     const { refresh_token } = req.body;
  //     const result = await authService.newAccessToken(refresh_token);
  //   } catch (error) {
  //     return responseUtils.errorAdmin(res, error.message);
  //   }
  // },
  logout: async (req, res) => {
    try {
      const { refreshToken } = req.body;
      const data = await authService.logout();
      return responseUtils.ok(res, data);
    } catch (error) {
      return responseUtils.errorAdmin(res, error.message);
    }
  },
};
