const {
  BodyWithLocale,
  ParamWithLocale,
  QueryWithLocale,
} = require("kernels/rules");

const options = {
  min: 8,
  max: 16,
};

const sampleValidation = {
  index: [
    new QueryWithLocale("email").isEmail().notEmpty(),
    new QueryWithLocale("password").isString().notEmpty(),
  ],
  create: [
    new BodyWithLocale("username").notEmpty(),
    new BodyWithLocale("email").isEmail().notEmpty(),
    new BodyWithLocale("password").notEmpty().isLength(options),
    new BodyWithLocale("role_id").isNumberic(),
    new BodyWithLocale("status").isString(),
  ],
  delete: [new ParamWithLocale("id").notEmpty()],
};

module.exports = sampleValidation;
