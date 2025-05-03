const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

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
    allowedFormats: ["png", "jpg", "jpeg"],
    transformation: [{ width: 1000, height: 1000, crop: 'limit' }]
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload an image file.'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // Reduced to 2MB per file
    files: 4
  }
});

module.exports = {
  cloudinary,
  storage,
  upload
};

// p1l8L6U1jvKmsZ4G
// darshanhalesh
// mongodb+srv://darshanhalesh:p1l8L6U1jvKmsZ4G@cluster0.aqs56.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0