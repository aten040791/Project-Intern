const {
  BodyWithLocale,
  ParamWithLocale,
  QueryWithLocale,
} = require("kernels/rules");

const db = require("models/index");

const languageValidation = {
  index: [
    // new BodyWithLocale("title").notEmpty(),
    new QueryWithLocale("keysearch").notEmpty(),
    //other rules goes here
  ],
  create: [
    new BodyWithLocale("name")
      .notEmpty()
      .isString()
      .unique(db.Language, "name"),
    new BodyWithLocale("locale").isString().notEmpty(),
    new BodyWithLocale("flag").isString(),
  ],
  delete: [new BodyWithLocale("id").notEmpty().exist(db.Language, "id")],
  update: [
    new ParamWithLocale("id").exist(db.Language, "id"),
    new BodyWithLocale("name").notEmpty().isString(),
    new BodyWithLocale("locale").isString().notEmpty(),
    new BodyWithLocale("flag").isString(),
  ],
};

module.exports = languageValidation;
