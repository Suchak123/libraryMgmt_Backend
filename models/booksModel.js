const mongoose = require('mongoose')

const booksModel = new mongoose.Schema({
    bookName: {
        type: String,
        required: true,
    },
    bookDescription: {
        type: String,
        required: true,
    },
    bookAuthor: {
        type: String,
        required: true,
    },
    bookCategory: {
        type: String,
        default: 'common',
    },
    bookImage: {
        type: String,
        default: 'uploads/avatar/avatar2.webp',
    },
    bookStatus: {
        type: String,
        enum: ['available', 'borrowed'],
        default: 'available',
    },
    currentOwner: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        default: null,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isBorrowed: {
        type: Boolean,
        default: false
    },
    borrowDuration: {
        type: Number,
        default: 0
    },
    borrowTimestamp: {
        type: Date,
    },
}, {timestamps: true})

module.exports = mongoose.model('books', booksModel)