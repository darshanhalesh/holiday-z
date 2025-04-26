const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Cloudinary storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'wanderlust_DEV',
    allowedFormats: ["png", "jpg", "jpeg"], // Corrected parameter name
  },
});

module.exports = {
  cloudinary,
  storage,
};

// p1l8L6U1jvKmsZ4G
// darshanhalesh
// mongodb+srv://darshanhalesh:p1l8L6U1jvKmsZ4G@cluster0.aqs56.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0