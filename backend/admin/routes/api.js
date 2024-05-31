require("express-router-group");
const express = require("express");
const { validate } = require("kernels/validations");
const middlewares = require("kernels/middlewares");
// const sampleController = require("modules/sample/controllers/sampleController");
// const sampleValidation = require("modules/sample/validations/sampleValidation");
const router = express.Router({ mergeParams: true });
const userController = require("modules/user/controllers/userController");
const categoryController = require("modules/category/controllers/categoryController");
const userValidation = require("modules/user/validations/userValidation");
const categoryValidation = require("modules/category/validations/categoryValidation");
const languageValidation = require("modules/language/validations/languageValidation");
const languageController = require("modules/language/controllers/languageController");

// router.group("/posts",middlewares([authenticated, role("owner")]), validate([]),(router) => {
//     router.post("/create",validate([createPostRequest]),postsController.create);
//     router.put("/update/:postId",validate([updatePostRequest]),postsController.update);
//     router.delete("/delete/:postId", postsController.destroy);
//   }
// );

// router.group('/sample', (router) => {
//   router.get('/', sampleController.index),
//   router.post('/with-validation', validate([sampleValidation.index]), sampleController.validate)
// })

router.group("/users", (router) => {
  router.delete("/delete/:id", userController.deleteUser);
  router.post(
    "/create",
    validate([userValidation.create]),
    userController.createUser
  );
  router.get("/", userController.index);
});

router.group("/categories", (router) => {
  router.delete(
    "/delete/:id",
    validate([categoryValidation.delete]),
    categoryController.deleteCategory
  );
  router.put(
    "/update/:id",
    validate([categoryValidation.update]),
    categoryController.updateCategory
  );
  router.post(
    "/create",
    validate([categoryValidation.create]),
    categoryController.createCategory
  );
  router.get("/", categoryController.index);
});

router.group("/languages", (router) => {
  router.delete(
    "/delete/:id",
    validate([languageValidation.delete]),
    languageController.deleteLanguage
  );
  router.put(
    "/update/:id",
    validate([languageValidation.update]),
    languageController.updateLanguage
  );
  router.post(
    "/create",
    validate([languageValidation.create]),
    languageController.createLanguage
  );
  router.get("/", languageController.index);
});

module.exports = router;
