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
    new BodyWithLocale("title").notEmpty(),
    //other rules goes here
  ],
  create: [
    new BodyWithLocale("username").notEmpty(),
    new BodyWithLocale("email").isEmail(),
    new BodyWithLocale("password").isLength(options),
    new BodyWithLocale("role_id").isNumberic(),
    new BodyWithLocale("status").isString(),
  ],
  delete: [new ParamWithLocale("id").notEmpty()],
};

module.exports = sampleValidation;
