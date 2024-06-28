const responseUntils = require("utils/responseUtils");
const categoryService = require("modules/category/services/categoryService");
const siteController = require("modules/site/controllers/siteController");
const { getApiName } = require("utils/apiUtils");
const slugify = require("slugify");

module.exports = {
  index: async (req, res) => {
    const categories = await categoryService.list();
    return responseUntils.ok(res, { categories: categories });
  },
  createCategory: async (req, res) => {
    const category = req.body;
    // creating slug
    category.slug = slugify(category.name, {
      lower: true, // convert to lower case
      strict: true, // remove special characters
    });
    const result = await categoryService.createCategory(category);
    return responseUntils.ok(res, { category: result });
  },
  updateCategory: async (req, res) => {
    const id = req.params;
    const category = req.body;
    const result = await categoryService.updateCategory(id, category);
    return responseUntils.ok(res, { category: result });
  },
  deleteCategory: async (req, res) => {
    const { ids } = req.body;
    // const idsArray = id.split(",");
    await categoryService.deleteCategory(ids);
    return responseUntils.ok(res, {
      message: "Categories deleted successfully",
    });
  },
  searchCategory: async (req, res) => {
    try {
      const { search } = req.query;
      // const result = await categoryService.searchCategory(search);
      // return responseUntils.ok(res, { category: result });
      const apiName = getApiName(req.originalUrl);
      const result = await siteController.search(apiName, search);
      return responseUntils.ok(res, { categories: result });
    } catch (error) {
      return responseUntils.errorAdmin(res, error.message);
    }
  },
};
