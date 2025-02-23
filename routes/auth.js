const express = require('express');
const { register, login } = require('../controllers/authController');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

router.post('/register', register);
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Google OAuth routes
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET);
    res.redirect(`http://localhost:3000/auth-success?token=${token}`);
  }
);

router.get('/test', async (req, res) => {
    try {
        // Try to count users
        const count = await User.countDocuments();
        res.json({ 
            status: 'Database working!',
            userCount: count 
        });
    } catch (error) {
        res.status(500).json({ 
            status: 'Database error',
            error: error.message 
        });
    }
});

module.exports = router; 