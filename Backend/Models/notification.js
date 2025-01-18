const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    message: String,
    isRead: { type: Boolean, default: false },
    createdAt: Date,
});



module.exports = mongoose.model("notification",notificationSchema);