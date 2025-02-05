const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { isLoggedin } = require('../middleware/isLoggedin');

// Update user's public key
router.post('/update-public-key', isLoggedin, async (req, res) => {
    try {
        const { publicKey } = req.body;
        const userId = req.user.id;

        await User.findByIdAndUpdate(userId, { publicKey });
        res.json({ message: 'Public key updated successfully' });
    } catch (error) {
        console.error('Error updating public key:', error);
        res.status(500).json({ message: 'Error updating public key' });
    }
});

// Get all users
router.get('/', isLoggedin, async (req, res) => {
    try {
        const users = await User.find({});
        // Only send necessary user data
        const sanitizedUsers = users.map(user => ({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            publicKey: user.publicKey
        }));
        res.json(sanitizedUsers);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get user by ID
router.get('/:userId', isLoggedin, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Only send necessary user data
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            publicKey: user.publicKey
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
