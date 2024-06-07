const {
  BodyWithLocale,
  ParamWithLocale,
  QueryWithLocale,
} = require("kernels/rules");
const db = require("models/index");

const options = {
  min: 8,
  max: 16,
};

const optionsKeySearch = {
  min: 3,
};

const sampleValidation = {
  index: [
    // new BodyWithLocale("title").notEmpty(),
    //other rules goes here
    new QueryWithLocale("keysearch").notEmpty(),
    // new ParamWithLocale("keysearch").isLength(optionsKeySearch),
  ],
  create: [
    new BodyWithLocale("username").notEmpty().isString(),
    new BodyWithLocale("email").isEmail().notEmpty().isString(),
    new BodyWithLocale("phone").isString(),
    new BodyWithLocale("password").isLength(options).notEmpty().isString(),
    new BodyWithLocale("role_id").isNumberic().notEmpty(),
    new BodyWithLocale("status").isString(),
  ],
  delete: [new BodyWithLocale("ids").notEmpty()],
  update: [
    new ParamWithLocale("id").notEmpty(),
    new BodyWithLocale("username").notEmpty().isString(),
    new BodyWithLocale("email").isEmail().notEmpty().isString(),
    new BodyWithLocale("phone").isString(),
    new BodyWithLocale("password").isLength(options).notEmpty().isString(),
    new BodyWithLocale("role_id").isNumberic().notEmpty(),
    new BodyWithLocale("status").isString(),
  ],
};

module.exports = sampleValidation;
