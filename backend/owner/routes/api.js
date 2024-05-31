require("express-router-group");
const express = require("express");
const { validate } = require("kernels/validations");
const middlewares = require("kernels/middlewares");
const sampleController = require("modules/sample/controllers/sampleController");
const sampleValidation = require("modules/sample/validations/sampleValidation");
const postController = require("modules/owner/post/controllers/postController");
const postValidation = require("modules/owner/post/validations/postValidation")
const router = express.Router({ mergeParams: true });

// router.group("/posts",middlewares([authenticated, role("owner")]), validate([]),(router) => {
//     router.post("/create",validate([createPostRequest]),postsController.create);
//     router.put("/update/:postId",validate([updatePostRequest]),postsController.update);
//     router.delete("/delete/:postId", postsController.destroy);
//   }
// );

router.group('/post', (router) => {
  router.get('/', validate([postValidation.index]), postController.index),
  router.get('/:id', validate([postValidation.getById]), postController.getById),
  router.post('/create', validate([postValidation.create]), postController.create),
  router.put('/update/:id', validate([postValidation.update]), postController.update),
  router.delete('/delete/:id', validate([postValidation.delete]), postController.delete)
})

router.group('/sample', (router) => {
  router.get('/', sampleController.index),
  router.post('/with-validation', validate([sampleValidation.index]), sampleController.validate)
})


module.exports = router;
