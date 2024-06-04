const {
  BodyWithLocale,
  ParamWithLocale,
  QueryWithLocale,
} = require("kernels/rules");
const { update } = require("modules/sample/validations/sampleValidation");

const categoryValidation = {
  index: [
    // new BodyWithLocale("title").notEmpty(),
    //other rules goes here
  ],
  create: [
    new BodyWithLocale("name").notEmpty().isString(),
    new BodyWithLocale("slug").notEmpty().isString(),
  ],
  delete: [new ParamWithLocale("id").notEmpty().isNumberic()],
  update: [
    new BodyWithLocale("name").notEmpty().isString(),
    new BodyWithLocale("slug").notEmpty().isString(),
  ],
};

module.exports = categoryValidation;
