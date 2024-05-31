const {
  BodyWithLocale,
  ParamWithLocale,
  QueryWithLocale,
} = require("kernels/rules");

const languageValidation = {
  index: [
    new BodyWithLocale("title").notEmpty(),
    //other rules goes here
  ],
  create: [
    new BodyWithLocale("name").notEmpty(),
    new BodyWithLocale("locale").isString(),
    new BodyWithLocale("flag").isString(),
  ],
  delete: [
    new ParamWithLocale("id").notEmpty(),
    new ParamWithLocale("id").isNumberic(),
  ],
  update: [
    new BodyWithLocale("name").notEmpty(),
    new BodyWithLocale("locale").isString(),
    new BodyWithLocale("flag").isString(),
  ],
};

module.exports = languageValidation;
