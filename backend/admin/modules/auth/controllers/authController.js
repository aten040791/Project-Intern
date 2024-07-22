const { check } = require("express-validator");
const authService = require("modules/auth/services/authService");
const responseUtils = require("utils/responseUtils");

module.exports = {
  login: async (req, res) => {
    // const options = {
    //   httpOnly: false,
    //   secure: false, // Đặt true nếu sử dụng HTTPS
    //   sameSite: "Strict",
    //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
    // };

    try {
      const { email, password } = req.body;
      const data = await authService.login(email, password);

      // if (checked) {
      //   res.cookie("e", email, options);
      //   res.cookie("p", password, options);
      // }

      // console.log("==>", req.cookies);

      return responseUtils.ok(res, data);
    } catch (error) {
      return responseUtils.unauthorized(res, error.message);
    }
    // const { email, password } = req.body;
    // const data = await authService.login(email, password);
    // return responseUtils.ok(res, data);
  },
};
