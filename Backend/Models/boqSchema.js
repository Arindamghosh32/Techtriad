const mongoose = require('mongoose');

const boqSchema = mongoose.Schema({
    title: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    items: [
        {
            description: String,
            quantity: Number,
            unit: String,
            price: Number,
        }
    ],
    status: {
        type: String,
        enum: ['draft', 'reviewed', 'approved'],
        default: 'draft',
    },
    stakeholders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    createdAt: Date,
});

module.exports = mongoose.model('boq',boqSchema);