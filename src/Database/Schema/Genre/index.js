const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genreSchema = new Schema({
    genre_name: String,
    genre_id: Number
});

const Genre = mongoose.model('Genre', genreSchema, 'genres');

module.exports = {
    Genre: Genre
};