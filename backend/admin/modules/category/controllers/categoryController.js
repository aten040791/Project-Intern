const responseUntils = require("utils/responseUtils");
const categoryService = require("modules/category/services/categoryService");

module.exports = {
  index: async (req, res) => {
    try {
      const categories = await categoryService.list();
      return responseUntils.ok(res, { categories: categories });
    } catch (error) {
      return responseUntils.notFound(res);
    }
  },
  createCategory: async (req, res) => {
    try {
      const category = req.body;
      const result = await categoryService.createCategory(category);
      return responseUntils.ok(res, { category: result });
    } catch (error) {
      return responseUntils.notFound(res);
    }
  },
  updateCategory: async (req, res) => {
    try {
      const id = req.params;
      const category = req.body;
      console.log(id);
      console.log(category);
      const result = await categoryService.updateCategory(id, category);
      return responseUntils.ok(res, { category: result });
    } catch (error) {
      return responseUntils.notFound(res);
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const id = req.params;
      const result = await categoryService.deleteCategory(id);
      return responseUntils.ok(res, { numberCategoryDeleted: result });
    } catch (error) {
      return responseUntils.notFound(res);
    }
  },
};
