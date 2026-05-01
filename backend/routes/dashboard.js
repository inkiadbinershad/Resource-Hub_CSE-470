const express = require('express');
const router = express.Router();
const pool = require('../db');

// Feature 10: GET DASHBOARD STATISTICS
router.get('/', async (req, res) => {
  try {
    // Count total resources
    const totalResources = await pool.query(
      'SELECT COUNT(*) FROM resources'
    );

    // Count available resources
    const availableResources = await pool.query(
      "SELECT COUNT(*) FROM resources WHERE status = 'Available'"
    );

    // Count total bookings
    const totalBookings = await pool.query(
      'SELECT COUNT(*) FROM bookings'
    );

    // Count pending bookings
    const pendingBookings = await pool.query(
      "SELECT COUNT(*) FROM bookings WHERE status = 'Pending'"
    );

    res.json({
      message: '✅ Dashboard stats fetched successfully!',
      stats: {
        totalResources: parseInt(totalResources.rows[0].count),
        availableResources: parseInt(availableResources.rows[0].count),
        totalBookings: parseInt(totalBookings.rows[0].count),
        pendingBookings: parseInt(pendingBookings.rows[0].count)
      }
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;