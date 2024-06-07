require("express-router-group");
const express = require("express");
const { validate } = require("kernels/validations");
const middlewares = require("kernels/middlewares");
const sampleController = require("modules/sample/controllers/sampleController");
const sampleValidation = require("modules/sample/validations/sampleValidation");
const postController = require("modules/owner/post/controllers/postController");
const postValidation = require("modules/owner/post/validations/postValidation");
const authController = require("modules/owner/auth/controllers/authController");
const authValidation = require("modules/owner/auth/validations/authValidation");
const authenticateToken = require("kernels/middlewares/authenticateToken")
const router = express.Router({ mergeParams: true });

// router.group("/posts",middlewares([authenticated, role("owner")]), validate([]),(router) => {
//     router.post("/create",validate([createPostRequest]),postsController.create);
//     router.put("/update/:postId",validate([updatePostRequest]),postsController.update);
//     router.delete("/delete/:postId", postsController.destroy);
//   }
// );

router.group('/post', (router) => {
  router.use(authenticateToken);
  router.get('/search', validate([postValidation.search]), postController.search),
  router.get('/', validate([postValidation.index]), postController.index),
  router.get('/:id', validate([postValidation.getById]), postController.getById),
  router.get('/category/:id', validate([postValidation.getCategory]), postController.getCategory),
  router.post('/create', validate([postValidation.create]), postController.create),
  router.put('/update/:id', validate([postValidation.update]), postController.update),
  router.delete('/delete', validate([postValidation.delete]), postController.delete),
  router.patch('/update-multiple', validate([postValidation.updateMultiple]), postController.updateMultiple)
})

router.group('/auth',(router) => {
  router.post('/sign-in',validate([authValidation.signIn]), authController.signIn),
  router.post('/sign-up',validate([authValidation.signUp]), authController.signUp),
  router.put('/reset-password',validate([authValidation.resPass]), authController.resPass)
  // router.post('/recover-password', authController.recPass),
})

router.group('/sample', (router) => {
  router.get('/', sampleController.index),
  router.post('/with-validation', validate([sampleValidation.index]), sampleController.validate)
})


module.exports = router;
