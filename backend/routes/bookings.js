const express = require('express');
const router = express.Router();
const pool = require('../db');
const authMiddleware = require('../middleware/auth');

// Feature 4: CREATE A BOOKING
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { resource_id, resource_name, date, start_time, end_time } = req.body;
    const user_id = req.user.id;

    // Check if resource exists and is available
    const resource = await pool.query(
      'SELECT * FROM resources WHERE id = $1',
      [resource_id]
    );

    if (resource.rows.length === 0) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    if (resource.rows[0].status === 'Booked') {
      return res.status(400).json({ message: 'Resource is already booked' });
    }

    if (resource.rows[0].status === 'Maintenance') {
      return res.status(400).json({ message: 'Resource is under maintenance' });
    }

    // Save booking to database
    const newBooking = await pool.query(
      `INSERT INTO bookings (user_id, resource_id, resource_name, date, start_time, end_time, status)
       VALUES ($1, $2, $3, $4, $5, $6, 'Pending')
       RETURNING *`,
      [user_id, resource_id, resource_name, date, start_time, end_time]
    );

    // Update resource status to Booked
    await pool.query(
      'UPDATE resources SET status = $1 WHERE id = $2',
      ['Booked', resource_id]
    );

    res.status(201).json({
      message: '✅ Booking created successfully!',
      booking: newBooking.rows[0]
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Feature 5: GET ALL BOOKINGS FOR LOGGED-IN USER
router.get('/my', authMiddleware, async (req, res) => {
  try {
    const user_id = req.user.id;

    const result = await pool.query(
      'SELECT * FROM bookings WHERE user_id = $1 ORDER BY created_at DESC',
      [user_id]
    );

    res.json({
      message: '✅ Bookings fetched successfully!',
      count: result.rows.length,
      bookings: result.rows
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Feature 9: CANCEL A BOOKING
router.put('/:id/cancel', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    // Make sure this booking belongs to the logged-in user
    const booking = await pool.query(
      'SELECT * FROM bookings WHERE id = $1 AND user_id = $2',
      [id, user_id]
    );

    if (booking.rows.length === 0) {
      return res.status(404).json({ message: 'Booking not found or not yours' });
    }

    if (booking.rows[0].status === 'Cancelled') {
      return res.status(400).json({ message: 'Booking is already cancelled' });
    }

    // Set booking status to Cancelled
    const updated = await pool.query(
      'UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *',
      ['Cancelled', id]
    );

    // Set the resource back to Available
    await pool.query(
      'UPDATE resources SET status = $1 WHERE id = $2',
      ['Available', booking.rows[0].resource_id]
    );

    res.json({
      message: '✅ Booking cancelled successfully!',
      booking: updated.rows[0]
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;