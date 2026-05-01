const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const resourceRoutes = require('./routes/resources');
const bookingRoutes = require('./routes/bookings');
const dashboardRoutes = require('./routes/dashboard');
const uploadRoutes = require('./routes/uploadRoutes');


// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));
app.use('/api/uploads', uploadRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/auth', authRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: '✅ ResourceHub Backend is running!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});