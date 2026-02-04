const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const protect = async (req, res, next) => {
    // Basic implementation for token check - reusing logic from learningRoutes or should be centralized
    // For now, I'll assume only login/signup don't need it, but /me does.
    // I will duplicate logic or import centralized middleware.
    // Let's rely on copying the logic to avoid circular deps with learningRoutes if I imported it there.

    try {
        const jwt = require('jsonwebtoken');
        const { promisify } = require('util');

        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: 'You are not logged in' });
        }

        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

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

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/me', protect, authController.getMe);
router.patch('/update-language', protect, userController.updateLanguage);

module.exports = router;
