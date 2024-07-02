// Path: backend/owner/modules/uploads/services/uploadService.js
const uploadService = {
  getFileUrl: (filename) => {
    return `http://localhost:3000/uploads/${filename}`;
  }
};

module.exports = uploadService;
