const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    meterNumber: {
        type: String,
        required: true,
        length: 6
    },
    token: {
        type: String,
        required: true,
        length: 8
    },
    tokenStatus: {
        type: String,
        enum: ['USED', 'NEW', 'EXPIRED'],
        required: true
    },
    tokenValueDays: {
        type: Number,
        required: true
    },
    purchasedDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Token', tokenSchema);
