const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema({
    comment_text: {

    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;