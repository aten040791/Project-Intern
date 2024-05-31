const postService = require("modules/owner/post/services/postService");
const responseUtils = require("utils/responseUtils");

const postController = {
  index: async (req, res) => {
    try {
      const posts = await postService.list();
      return responseUtils.ok(res, { 'data': posts });
    } catch (error) {
      return responseUtils.notFound(res);
    }
  },

  create: async (req, res) => {
    try {
      const post = req.body;
      const newPost = await postService.create(post);
      return responseUtils.ok(res, { 'data': newPost });
    } catch (error) {
      return responseUtils.notFound(res);
    }
  },
};

module.exports = postController;
