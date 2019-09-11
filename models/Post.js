const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('posts', PostSchema);