const { Schema } = require('mongoose');

const bookSchema = new Schema({
    authors: [
        {
            type: String
        }
    ],
    description: {
        type: String,
        required: true 
    },
    bookId: {
        type: String,
        required: true
    },
    bookImage: {
        type: String
    },
    bookLink:{
        type: String
    },
    bookTitle: {
        type: String,
        required: true
    }
});

module.exports = bookSchema;