const mongoose = require('mongoose');

const rfqSchema = mongoose.Schema({
    title: String,
    linkedBOQ: { type: mongoose.Schema.Types.ObjectId, ref: 'boq' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    vendors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    responses: [
        {
            vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
            quote: Number,
            comments: String,
        }
    ],
    status: {
        type: String,
        enum: ['pending', 'inReview', 'finalized'],
        default: 'pending',
    },
    createdAt: Date,
});
