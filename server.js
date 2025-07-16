const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const app = express();

// Enable CORS
app.use(cors());

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});

// Create uploads directory if it doesn't exist
const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Serve static files from uploads directory
app.use('/uploads', express.static('uploads'));

// Upload endpoint
app.post('/upload', upload.single('photo'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Register endpoint
app.post('/auth/register', express.json(), (req, res) => {
  try {
    const { name, email, password, phoneNumber, address, photo } = req.body;
    
    // Here you would typically:
    // 1. Validate the input
    // 2. Hash the password
    // 3. Save to database
    // 4. Generate JWT token
    
    res.json({ 
      message: 'User registered successfully',
      user: {
        name,
        email,
        phoneNumber,
        address,
        photo
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 