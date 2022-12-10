const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userMoviesSchema = new Schema({
    userId: String,
    moviesWatched: [ Schema.Types.Mixed ]
});

const UserMovies = mongoose.model('UserMovies', userMoviesSchema, 'userMovies');

module.exports = {
    UserMovies: UserMovies
};