const {
  BodyWithLocale,
  ParamWithLocale,
  QueryWithLocale,
} = require("kernels/rules");

const languageValidation = {
  index: [
    // new BodyWithLocale("title").notEmpty(),
    //other rules goes here
  ],
  create: [
    new BodyWithLocale("name").notEmpty().isString(),
    new BodyWithLocale("locale").isString().notEmpty(),
    new BodyWithLocale("flag").isString(),
  ],
  delete: [new ParamWithLocale("id").notEmpty().isNumberic()],
  update: [
    new BodyWithLocale("name").notEmpty().isString(),
    new BodyWithLocale("locale").isString().notEmpty(),
    new BodyWithLocale("flag").isString(),
  ],
};

module.exports = languageValidation;
