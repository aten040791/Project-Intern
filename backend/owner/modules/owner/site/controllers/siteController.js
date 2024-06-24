const siteService = require("modules/owner/site/services/siteService");
const responseUtils = require("utils/responseUtils");

const siteController = {
  getCategory: async (req, res) => {
      const data = await siteService.getCategory();
      return responseUtils.ok(res, data);
  },

  getLanguage: async (req, res) => {
      const data = await siteService.getLanguage();
      return responseUtils.ok(res, data);
  },
};

module.exports = siteController;
