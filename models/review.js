const mongoose = require('mongoose')
const { Schema } = mongoose

const reviewSchema = Schema({
    body: String,
    rating: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Review', reviewSchema)