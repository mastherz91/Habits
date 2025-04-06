const mongoose = require('mongoose');
const habitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    frequency: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    lastDone: {
        type: Date,
        default: Date.now
    },
    lastUpdate: {
        type: Date,
        default: Date.now
    },
    days: {
        type: Number,
        default: 1
    },
    startedaAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('habits', habitSchema);