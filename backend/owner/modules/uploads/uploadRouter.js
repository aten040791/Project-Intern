// Path: backend/owner/modules/uploads/uploadRouter.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const uploadController = require('./controllers/uploadController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

const router = express.Router();

// Add the file upload route
router.post('/', upload.single('file'), uploadController.uploadFile);

module.exports = router;
