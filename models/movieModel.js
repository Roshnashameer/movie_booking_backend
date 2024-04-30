const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    languages: {
        type: String,
        required: true
    },
    overView: {
        type: String,
        required: true
    },
    
    movieImage: {
        type: String,
        required: true
    },
    
});

const movies = mongoose.model('movies', movieSchema);

module.exports = movies;