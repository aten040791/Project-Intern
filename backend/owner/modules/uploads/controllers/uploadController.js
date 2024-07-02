// Path: backend/owner/modules/uploads/controllers/uploadController.js
const uploadService = require('../services/uploadService'); // Adjusted path

const uploadController = {
  uploadFile: (req, res) => {
    if (!req.file) {
      return res.status(400).send({ message: 'No file uploaded' });
    }
    const fileUrl = uploadService.getFileUrl(req.file.filename);
    res.send({ url: fileUrl });
  }
};

module.exports = uploadController;
