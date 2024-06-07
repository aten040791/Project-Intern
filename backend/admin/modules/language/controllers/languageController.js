const responseUntils = require("utils/responseUtils");
const languageService = require("modules/language/services/languageService");
const { getApiName } = require("utils/apiUtils");
const siteController = require("modules/site/controllers/siteController");

module.exports = {
  index: async (req, res) => {
    const languages = await languageService.list();
    return responseUntils.ok(res, { languages: languages });
  },
  createLanguage: async (req, res) => {
    const language = req.body;
    const result = await languageService.createLanguage(language);
    return responseUntils.ok(res, { language: result });
  },
  updateLanguage: async (req, res) => {
    const id = req.params;
    const language = req.body;
    const result = await languageService.updateLanguage(id, language);
    return responseUntils.ok(res, { language: result });
  },
  deleteLanguage: async (req, res) => {
    const { id } = req.body;
    const idsArray = id.split(",");
    await languageService.deleteLanguage(idsArray);
    return responseUntils.ok(res, {
      message: "Languages deleted successfully",
    });
  },
  searchLanguage: async (req, res) => {
    try {
      const { keysearch } = req.query;
      // const result = await languageService.searchLanguage(keysearch);
      const apiName = getApiName(req.originalUrl);
      const result = await siteController.search(apiName, keysearch);
      return responseUntils.ok(res, { languages: result });
    } catch (error) {
      return responseUntils.errorAdmin(res, error.message);
    }
  },
};
