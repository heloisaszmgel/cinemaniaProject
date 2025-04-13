const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [2, 'Title must contain at least 2 characters'],
    },
    genre: {
        type: String,
        required: [true, 'Genre is required'],
        minlength: [2, 'Genre must contain at least 2 characters'],
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
        min: [1, 'Rating must be at least 1 star'],
    },
    review: {
        type: String,
        required: [true, 'Review is required'],
        maxlength: [250, 'Review must contain max 250 characters'],
    },
}, {timestamps: true});

const Movies = mongoose.model('Movies', movieSchema);

module.exports = Movies;