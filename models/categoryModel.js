const mongoose = require('mongoose')

const categoryModel = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    }
}, {timestamps: true}
)

module.exports = mongoose.model('category', categoryModel)

