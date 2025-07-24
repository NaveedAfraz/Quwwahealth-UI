const express = require('express');
const router = express.Router();
const cloudinary = require('../cloudinary'); // Use centralized config
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer setup (disk storage)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed (jpeg, jpg, png, gif)'));
  }
});

// Error handling middleware
const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ 
      error: 'File upload error',
      details: err.message 
    });
  } else if (err) {
    return res.status(500).json({ 
      error: 'Internal server error',
      details: err.message 
    });
  }
  next();
};

// POST /api/upload
router.post('/', upload.single('file'), handleUploadError, async (req, res) => {
  try {
    console.log('Upload request received');
    console.log('Request file:', req.file);
    
    if (!req.file) {
      console.error('No file in request');
      return res.status(400).json({ 
        error: 'No file uploaded',
        details: 'The request did not contain a file' 
      });
    }
    
    // Verify file exists on disk
    if (!fs.existsSync(req.file.path)) {
      console.error('File does not exist on disk:', req.file.path);
      return res.status(400).json({ 
        error: 'File upload failed',
        details: 'The uploaded file could not be found on the server' 
      });
    }
    console.log('Cloudinary ENV:', {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
      });
      
    console.log('Uploading to Cloudinary...');
    const uploadOptions = {
      folder: 'blog_images',
      resource_type: 'auto',
      use_filename: true,
      unique_filename: true,
      overwrite: false,
      invalidate: true
    };
    
    console.log('Upload options:', uploadOptions);
    
    let result;
    try {
      result = await cloudinary.uploader.upload(req.file.path, uploadOptions);
      console.log('Cloudinary upload successful:', result);
    } catch (uploadErr) {
      console.error('Cloudinary upload error:', {
        message: uploadErr.message,
        http_code: uploadErr.http_code,
        name: uploadErr.name,
        code: uploadErr.code
      });
      
      // Clean up the temp file
      fs.unlinkSync(req.file.path);
      
      return res.status(400).json({
        error: 'Failed to upload to Cloudinary',
        details: uploadErr.message || 'Unknown error during upload',
        code: uploadErr.http_code || 'UPLOAD_ERROR'
      });
    }

    // Clean up the temp file
    try {
      fs.unlinkSync(req.file.path);
      console.log('Temporary file deleted:', req.file.path);
    } catch (cleanupErr) {
      console.error('Error deleting temp file:', cleanupErr);
      // Continue even if cleanup fails
    }

    if (!result || !result.secure_url) {
      console.error('Invalid Cloudinary response:', result);
      return res.status(500).json({
        error: 'Invalid response from Cloudinary',
        details: 'The upload was successful but no URL was returned'
      });
    }

    console.log('Sending success response with URL:', result.secure_url);
    res.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
      format: result.format,
      bytes: result.bytes,
      width: result.width,
      height: result.height
    });
  } catch (err) {
    console.error('Error during upload:', err);
    
    // Clean up temp file if it exists
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error cleaning up temp file:', err);
      });
    }

    return res.status(500).json({
      error: 'Failed to upload file to Cloudinary',
      details: err.message,
    });
  }
});

module.exports = router;
