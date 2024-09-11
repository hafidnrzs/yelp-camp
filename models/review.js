const mongoose = require('mongoose')
const { Schema } = mongoose

const reviewSchema = Schema({
    body: String,
    rating: String
})

module.exports = mongoose.model('Review', reviewSchema)