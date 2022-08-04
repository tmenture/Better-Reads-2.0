const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = require('./User')

const reviewSchema = new Schema({
    reviewText: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: [userSchema]
});

module.exports = reviewSchema;