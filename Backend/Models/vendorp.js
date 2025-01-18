const mongoose = require('mongoose');

const vendorPerformanceSchema = mongoose.Schema({
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    completedRFQs: Number,
    receivedRFQS: Number,
    averageRating: Number,
    
});


module.exports = mongoose.model('vendorp',vendorPerformanceSchema)