require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Test DB connection
app.get('/test-db', (req, res) => {
    if (mongoose.connection.readyState === 1) {
        res.json({ status: 'Connected to MongoDB!' });
    } else {
        res.json({ status: 'Not connected to MongoDB!' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 