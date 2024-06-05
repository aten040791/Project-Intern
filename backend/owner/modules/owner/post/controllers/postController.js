const postService = require("modules/owner/post/services/postService");
const responseUtils = require("utils/responseUtils");

const postController = {
  //Get post list
  index: async (req, res) => {
    try {
      const posts = await postService.list();
      return responseUtils.ok(res, posts);
    } catch (error) {
      return responseUtils.notFound(res);
    }
  },

  getCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await postService.category(id);
      return responseUtils.ok(res, category);
    } catch (error) {
      return responseUtils.userError(res, error.message);
    }
  },

  //Get post by ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const post = await postService.getById(id);
      return responseUtils.ok(res, post);
    } catch (error) {
      return responseUtils.userError(res, error.message);
    }
  },

  //Create new post
  create: async (req, res) => {
    try {
      const post = req.body;
      const newPost = await postService.create(post);
      return responseUtils.ok(res, newPost);
    } catch (error) {
      return responseUtils.userError(res, error.message);
    }
  },

  //Update post
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedPostData = req.body;
      const updatedPost = await postService.update(id, updatedPostData);
      return responseUtils.ok(res, updatedPost);
    } catch (error) {
      return responseUtils.userError(res, error.message);
    }
  },

  //Delete post
  delete: async (req, res) => {
    try {
      const { ids } = req.params;
      const idsArray = ids.split(",");
      await postService.delete(idsArray);
      return responseUtils.ok(res, { message: "Posts deleted successfully" });
    } catch (error) {
      return responseUtils.userError(res, error.message);
    }
  },

  updateMultiple: async (req, res) => {
    try {
        const { ids, value, type } = req.body;
        const updatedPostData = {
            value: value,
            type: type
        };
        const updatedPosts = await postService.updateMultiple(ids, updatedPostData);
        return responseUtils.ok(res, updatedPosts);
    } catch (error) {
        return responseUtils.userError(res, error.message);
    }
},

  
};

module.exports = postController;
