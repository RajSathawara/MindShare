const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Set up storage engine
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'mindshare-ideas',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 800, height: 600, crop: 'limit' }] // Auto-resize
  }
});

module.exports = { cloudinary, storage };