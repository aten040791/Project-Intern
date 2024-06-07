const { BodyWithLocale, ParamWithLocale } = require("kernels/rules");
const db = require("models/index");

const authValidation = {
  signIn: [
    new BodyWithLocale("email").notEmpty().isEmail().exist(db.User, "email"),
    new BodyWithLocale("password").notEmpty(),
  ],

  signUp: [
    new BodyWithLocale("email").notEmpty().isEmail().unique(db.User, "email"),
    new BodyWithLocale("password").isLength({ min: 8 }),
    new BodyWithLocale("confirmPassword").notEmpty().confirmed("password"),
    new BodyWithLocale("role_id").notEmpty(),
  ],

  resPass: [
    new BodyWithLocale("email").notEmpty().isEmail().exist(db.User, "email"),
    new BodyWithLocale("password").isLength({ min: 8 }),
    new BodyWithLocale("confirmPassword").notEmpty().confirmed("password"),
  ],
};

module.exports = authValidation;
