const mongoose = require('mongoose');

const { Schema } = mongoose;

const reviewSchema = new Schema({
    reviewText: {
        type: String,
    },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;