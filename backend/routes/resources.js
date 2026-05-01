const express = require('express');
const router = express.Router();
const pool = require('../db');
const authMiddleware = require('../middleware/auth');

// Feature 1: GET ALL RESOURCES (Browsing)
// Feature 2: SEARCH by keyword
// Feature 3: FILTER by category
router.get('/', async (req, res) => {
  try {
    const { search, category } = req.query;

    let query = 'SELECT * FROM resources WHERE 1=1';
    let values = [];
    let counter = 1;

    // Feature 2: Search by name
    if (search) {
      query += ` AND name ILIKE $${counter}`;
      values.push(`%${search}%`);
      counter++;
    }

    // Feature 3: Filter by category
    if (category && category !== 'All') {
      query += ` AND category = $${counter}`;
      values.push(category);
      counter++;
    }

    query += ' ORDER BY created_at DESC';

    const result = await pool.query(query, values);

    res.json({
      message: '✅ Resources fetched successfully!',
      count: result.rows.length,
      resources: result.rows
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET SINGLE RESOURCE by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT * FROM resources WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    res.json({
      message: '✅ Resource fetched successfully!',
      resource: result.rows[0]
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Feature 8: ADD RESOURCE (Admin only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    // Only admins can add resources
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    const { name, category, status, image, description, capacity, location, amenities } = req.body;

    const result = await pool.query(
      `INSERT INTO resources 
        (name, category, status, image, description, capacity, location, amenities) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [name, category, status || 'Available', image, description, capacity, location, amenities]
    );

    res.status(201).json({
      message: '✅ Resource added successfully!',
      resource: result.rows[0]
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Feature 8: UPDATE RESOURCE (Admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    // Only admins can update resources
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    const { id } = req.params;
    const { name, category, status, image, description, capacity, location, amenities } = req.body;

    const result = await pool.query(
      `UPDATE resources 
       SET name=$1, category=$2, status=$3, image=$4, description=$5, 
           capacity=$6, location=$7, amenities=$8
       WHERE id=$9 
       RETURNING *`,
      [name, category, status, image, description, capacity, location, amenities, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    res.json({
      message: '✅ Resource updated successfully!',
      resource: result.rows[0]
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Feature 8: DELETE RESOURCE (Admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    // Only admins can delete resources
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM resources WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    res.json({ message: '✅ Resource deleted successfully!' });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;