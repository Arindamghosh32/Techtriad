const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    contact: Number,
    email: String,
    password: String,
    role: { type: String, enum: ['vendor', 'buyer'], default: 'buyer' },
    address: String, 
    organization: String,
    publicKey: { type: String, default: null }, // Added for encrypted chat
    notifications: [
        {
            type: { type: String },
            message: String,
            timestamp: { type: Date, default: Date.now },
            read: { type: Boolean, default: false },
        }
    ],
});

module.exports = mongoose.model("user", userSchema);