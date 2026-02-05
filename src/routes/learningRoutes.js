const express = require('express');
const learningController = require('../controllers/learningController');
const authController = require('../controllers/authController'); // We need a protect middleware

// Inline protect middleware for now or extract to authController
const protect = async (req, res, next) => {
    // Basic implementation for token check
    try {
        const jwt = require('jsonwebtoken');
        const { promisify } = require('util');
        const process = require('process');

        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: 'You are not logged in' });
        }

        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

        // Check if user still exists
        const User = require('../models/User');
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return res.status(401).json({ message: 'User no longer exists' });
        }

        req.user = currentUser;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};


const router = express.Router();

router.use(protect); // Protect all routes

router.post('/start', learningController.startSession);
router.post('/answer', learningController.submitAnswer);
router.post('/continue', learningController.analyzeAndContinue);

module.exports = router;
