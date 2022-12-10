const Url = require('./Url.js');
const axios = require('axios');

const handleIncomingMovies = (movieData) => {
    return movieData.map((item) => {
        
        const backdrop_path = item.backdrop_path !== null ?
        'https://image.tmdb.org/t/p/original' + item.backdrop_path : null;

        return{
           title: item.title,
           release_date: item.release_date,
           overview: item.overview,
           poster_path: 'https://image.tmdb.org/t/p/w500' + item.poster_path,
           backdrop_path: backdrop_path,
           genre_ids: item.genre_ids,
        }
    });
}

const MoviesChoice = async (providerId, genreId) => {
    //URL formation
    const url = new Url();

    if(providerId !== undefined && genreId === undefined){
        url.addParam('with_watch_providers', providerId);
    }else if(providerId === undefined && genreId !== undefined){
        url.addParam('with_genres', genreId);
    }else if(providerId !== undefined && genreId !== undefined){
        url.addParam('with_genres', genreId);
        url.addParam('with_watch_providers', providerId);
    }

    //Axios GET request themoviedb  API
    const movies = await axios.get(url.toString(),
    { headers: { 'Accept-Encoding': 'application/json' } })
    .then((response) => { return response.data; });
    //console.log(movies);
    //Refine incoming data
    return handleIncomingMovies(movies.results);

}


module.exports = {
    MoviesChoice:  MoviesChoice
};