const mongoose = require('mongoose');
const { type } = require('os');

const userModel = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true
    },
    userPassword : {
        type: String,
        required: true,
    },
    userProfilePic: {
        type: String,
        default: 'uploads\avatar\avatar1.png'
    },
    userRole: {
        type: String,
        default: "user",
    },
    borrowBooks: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {timestamps: true}
);

module.exports = mongoose.model('user', userModel)