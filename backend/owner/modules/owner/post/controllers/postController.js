const postService = require("modules/owner/post/services/postService");
const responseUtils = require("utils/responseUtils");

const postController = {
  //Get post list 
  index: async (req, res) => {
    try {
      const posts = await postService.list();
      return responseUtils.ok(res, { 'data': posts });
    } catch (error) {
      return responseUtils.notFound(res);
    }
  },

  //Get post by ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const post = await postService.getById(id);
      return responseUtils.ok(res, { 'data': post });
    } catch (error) {
      return responseUtils.notFound(res);
    }
  },

  //Create new post
  create: async (req, res) => {
    try {
      const post = req.body;
      const newPost = await postService.create(post);
      return responseUtils.ok(res, { 'data': newPost });
    } catch (error) {
      return responseUtils.notFound(res);
    }
  },

  //Update post
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedPostData = req.body;
      const updatedPost = await postService.update(id, updatedPostData);
      return responseUtils.ok(res, { 'data': updatedPost });
    } catch (error) {
      return responseUtils.notFound(res);
    }
  },

  //Delete post
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await postService.delete(id);
      return responseUtils.ok(res, { message: 'Post deleted successfully' });
    } catch (error) {
      return responseUtils.notFound(res);
    }
  },

};

module.exports = postController;
