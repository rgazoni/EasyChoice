const Url = require('./Url.js');
const axios = require('axios');

const handleIncomingMovies = (movieData) => {
    return movieData.map((item) => {
        return{
           title: item.title,
           release_date: item.release_date,
           overview: item.overview,
           poster_path: 'https://image.tmdb.org/t/p/w500' + item.poster_path,
           genre_ids: item.genre_ids,
        }
    });
}

const MoviesChoice = async (providerId, genreId) => {
    //URL formation
    const url = new Url();
    url.addParam('with_watch_providers', providerId);
    url.addParam('with_genres', genreId);
    
    //Axios GET request themoviedb  API
    const movies = await axios.get(url.toString(),
    { headers: { 'Accept-Encoding': 'application/json' } })
    .then((response) => { return response.data; });

    //Refine incoming data
    return handleIncomingMovies(movies.results);

}


module.exports = {
    MoviesChoice:  MoviesChoice
};