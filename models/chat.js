const mongoose = require('mongoose');
const chatSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        reqired: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('users', chatSchema);