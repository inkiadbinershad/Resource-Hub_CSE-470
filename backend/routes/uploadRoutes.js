const express = require('express');
const router = express.Router();
const pool = require('../db');
const authMiddleware = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Configure where and how files are saved
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Save file with timestamp to avoid name conflicts
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

// Only allow these file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|doc|docx|jpg|jpeg|png/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  if (extname) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF, DOC, DOCX, JPG, PNG files are allowed'));
  }
};

const upload = multer({ storage, fileFilter });

// Feature 6: UPLOAD A FILE (share a resource)
router.post('/', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const user_id = req.user.id;

    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }

    const file_path = req.file.path;
    const file_type = path.extname(req.file.originalname).toLowerCase();

    const newUpload = await pool.query(
      `INSERT INTO uploads (user_id, title, description, file_path, file_type)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [user_id, title, description, file_path, file_type]
    );

    res.status(201).json({
      message: '✅ File uploaded successfully!',
      upload: newUpload.rows[0]
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Feature 6: GET ALL UPLOADED FILES
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM uploads ORDER BY created_at DESC'
    );

    res.json({
      message: '✅ Uploads fetched successfully!',
      count: result.rows.length,
      uploads: result.rows
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;