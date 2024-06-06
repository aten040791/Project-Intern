const responseUntils = require("utils/responseUtils");
const languageService = require("modules/language/services/languageService");

module.exports = {
  index: async (req, res) => {
    try {
      const languages = await languageService.list();
      return responseUntils.ok(res, { languages: languages });
    } catch (error) {
      return responseUntils.notFound(res);
    }
  },
  createLanguage: async (req, res) => {
    try {
      const language = req.body;
      const result = await languageService.createLanguage(language);
      return responseUntils.ok(res, { language: result });
    } catch (error) {
      return responseUntils.errorAdmin(res, "Create Language Failed");
    }
  },
  updateLanguage: async (req, res) => {
    try {
      const id = req.params;
      const language = req.body;
      const result = await languageService.updateLanguage(id, language);
      return responseUntils.ok(res, { language: result });
    } catch (error) {
      return responseUntils.errorAdmin(res, "Update Failed");
    }
  },
  deleteLanguage: async (req, res) => {
    // try {
    //   const id = req.params;
    //   const result = await languageService.deleteLanguage(id);
    //   return responseUntils.ok(res, { Delete: "Successful" });
    // } catch (error) {
    //   return responseUntils.errorAdmin(res, "Delete Failed");
    // }
    try {
      const { id } = req.params;
      const idsArray = id.split(",");
      await languageService.deleteLanguage(idsArray);
      return responseUntils.ok(res, {
        message: "Languages deleted successfully",
      });
    } catch (error) {
      return responseUntils.errorAdmin(res, error.message);
    }
  },
  searchLanguage: async (req, res) => {
    try {
      const { language } = req.query;
      const result = await languageService.searchLanguage(language);
      // console.log(result);
      return responseUntils.ok(res, { languages: result });
    } catch (error) {
      return responseUntils.notFound(res);
    }
  },
};
