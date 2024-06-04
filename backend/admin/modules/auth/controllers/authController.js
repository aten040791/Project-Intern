const authService = require("modules/auth/services/authService");
const { sign, signRefreshToken } = require("utils/jwtUtils");
const { setItem, getItem } = require("helpers/localStorage");
const responseUtils = require("utils/responseUtils");
const { hash, compare } = require("kernels/hash/index");

module.exports = {
  login: async (req, res) => {
    const userLogin = req.query;
    const user = await authService.getUser(userLogin);
    if (user) {
      const pwComPare = await compare(userLogin.password, user.password);
      if (pwComPare) {
        const role = await authService.getRole(userLogin);
        const access_token = sign(user.id, role);
        const refresh_token = signRefreshToken(user.id, role); // refresh token
        //   ! save in localstorage
        if (access_token && refresh_token) {
          setItem(access_token);
          // todo: token after it saved in localstorage
          const accessToken = getItem();
          return responseUtils.ok(res, {
            data: userLogin,
            access_token: accessToken,
            refresh_token: refresh_token,
          });
        } else {
          return responseUtils.notFound(res);
        }
      } else {
        return responseUtils.notFound(res);
      }
    }
  },
  // verifi token done
  getUser: async (req, res, next) => {
    const user = req.user;
    if (user) {
      return responseUtils.ok(res, { data: user });
    } else {
      return responseUtils.notFound(res);
    }
  },
  // register
  // ! wrong
  register: async (req, res) => {
    try {
      const user = req.body;
      const newUser = await authService.createUser(user);
      return responseUtils.ok(res, { user: newUser });
    } catch (error) {
      return responseUtils.invalidated(res, "Error Sign Up");
    }
  },
};
