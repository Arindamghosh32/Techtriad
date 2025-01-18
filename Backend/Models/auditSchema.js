const mongoose = require('mongoose');

const auditLogSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    action: String,
    timestamp: Date,
    ipAddress: String,
    details: String,
});


module.exports = mongoose.model('audit',auditLogSchema);