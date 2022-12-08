const Url = require('./Url.js');
const axios = require('axios');

// const handleIncomingMovies = (movieData) => {
//     return movieData.map((item) => {
//         return{
//            tile: item.original_title
//         }
//     });
// }

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
    //handleIncomingMovies(movies.results);
    return movies;

}


module.exports = {
    MoviesChoice:  MoviesChoice
};