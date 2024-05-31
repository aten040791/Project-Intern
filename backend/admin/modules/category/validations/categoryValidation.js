const {
  BodyWithLocale,
  ParamWithLocale,
  QueryWithLocale,
} = require("kernels/rules");
const { update } = require("modules/sample/validations/sampleValidation");

const categoryValidation = {
  index: [
    new BodyWithLocale("title").notEmpty(),
    //other rules goes here
  ],
  create: [
    new BodyWithLocale("name").notEmpty(),
    new BodyWithLocale("name").isString(),
    new BodyWithLocale("slug").notEmpty(),
    new BodyWithLocale("slug").isString(),
  ],
  delete: [
    new ParamWithLocale("id").notEmpty(),
    new ParamWithLocale("id").isNumberic(),
  ],
  update: [
    new BodyWithLocale("name").notEmpty(),
    new BodyWithLocale("name").isString(),
    new BodyWithLocale("slug").notEmpty(),
    new BodyWithLocale("slug").isString(),
  ],
};

module.exports = categoryValidation;
