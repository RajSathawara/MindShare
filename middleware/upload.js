const multer = require('multer');
const { storage } = require('../config/cloudinary');

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 3 * 1024 * 1024 }, // 3MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files allowed!'), false);
  }
});

module.exports = upload;