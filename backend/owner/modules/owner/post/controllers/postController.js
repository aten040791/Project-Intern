const postService = require("modules/owner/post/services/postService");
const responseUtils = require("utils/responseUtils");
const slugify = require("slugify");

const postController = {
  //Get post list
  index: async (req, res) => {
    const posts = await postService.list();
    return responseUtils.ok(res, posts);
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
    const { id } = req.params;
    const post = await postService.getById(id);
    return responseUtils.ok(res, post);
  },

  getByUid: async (req, res) => {
    const { uid } = req.params;
    const post = await postService.getByUid(uid);
    return responseUtils.ok(res, post);
  },

  //Search...
  search: async (req, res) => {
    try {
      const keyword = req.query.keyword;
      const post = await postService.search(keyword);
      return responseUtils.ok(res, post);
    } catch (error) {
      return responseUtils.userError(res, error.message);
    }
  },

  //Create new post
  create: async (req, res) => {
    try {
      const post = JSON.parse(req.body.formData);
      if (!post.title ) {
        return responseUtils.notFound(res);
      }
      post.slug = slugify(post.title, {
        lower: true,
        strict: true
      });
      const newPost = await postService.create(post);
      return responseUtils.ok(res, newPost);
    } catch (error) {
      console.error('Failed to create post:', error);
      return responseUtils.error(res, error);
    }
  },

  //Update post
  update: async (req, res) => {
    const { id } = req.params;
    const updatedPostData = JSON.parse(req.body.formData);
    const updatedPost = await postService.update(id, updatedPostData);
    return responseUtils.ok(res, updatedPost);
  },

  //Delete post
  delete: async (req, res) => {
    const idsPost = req.body.formData.Ids;
    await postService.delete(idsPost);
    return responseUtils.ok(res, { message: "Posts deleted successfully" });
  },

  updateMultiple: async (req, res) => {
    const { Ids, value, type } = req.body.formData;
    const updatedPostData = {
      value: value,
      type: type,
    };
    const updatedPosts = await postService.updateMultiple(Ids, updatedPostData);
    return responseUtils.ok(res, updatedPosts);
  },

};

module.exports = postController;
