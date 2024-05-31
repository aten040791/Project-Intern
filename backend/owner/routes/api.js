require("express-router-group");
const express = require("express");
const { validate } = require("kernels/validations");
const middlewares = require("kernels/middlewares");
const sampleController = require("modules/sample/controllers/sampleController");
const sampleValidation = require("modules/sample/validations/sampleValidation");
const postController = require("modules/owner/post/controllers/postController");
const router = express.Router({ mergeParams: true });

// router.group("/posts",middlewares([authenticated, role("owner")]), validate([]),(router) => {
//     router.post("/create",validate([createPostRequest]),postsController.create);
//     router.put("/update/:postId",validate([updatePostRequest]),postsController.update);
//     router.delete("/delete/:postId", postsController.destroy);
//   }
// );

router.group('/post', (router) => {
  router.get('/', postController.index),
  router.post('/create', postController.create)
})

router.group('/sample', (router) => {
  router.get('/', sampleController.index),
  router.post('/with-validation', validate([sampleValidation.index]), sampleController.validate)
})


module.exports = router;
