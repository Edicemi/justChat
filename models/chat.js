const mongoose = require('mongoose');
const chatSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User_Id",
    },
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