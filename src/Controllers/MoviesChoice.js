const Url = require('./Url.js');
const axios = require('axios');

const dataPresentation = async (movieData) => {
    return await Promise.all(movieData.map(async (item) => {

        const backdrop_path = item.backdrop_path !== null ?
        'https://image.tmdb.org/t/p/original' + item.backdrop_path : null;

        const list_providers = await fetchWatchProviders(item.id);
        //console.log(list_providers);

        return {
           title: item.title,
           release_date: item.release_date,
           overview: item.overview,
           poster_path: 'https://image.tmdb.org/t/p/w500' + item.poster_path,
           backdrop_path: backdrop_path,
           providers: list_providers,
           genre_ids: item.genre_ids,
        }
    }));
}

//Randomly pick one page of third party movie API on 0 - 500 as documentation provided shows 
const randomPage = (range) => {
    const number = 1 + Math.floor(Math.random() * range);
    //console.log(number);
    return number;
}

//Axios GET request themoviedb  API
const fetchMovies = async (url) => {
    return await axios.get(url.toString(),
    { headers: { 'Accept-Encoding': 'application/json' } })
    .then((response) => { 
        //console.log(response.data);
        return response.data;
    });
}

const fetchWatchProviders = async (id) => {

    const providers = await axios.get(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${process.env.API_KEY}`,
    { headers: { 'Accept-Encoding': 'application/json' } })
    .then((response) => { 
        return response.data;
    });
    //console.log(providers.results.BR);

    try {
        const filteredProviders = providers.results.BR.flatrate.filter(item => item.display_priority < 9);
        return filteredProviders.map(provider => {
            return {
                logo_path: 'https://image.tmdb.org/t/p/original' + provider.logo_path,
                provider_id: provider.provider_id,
                provider_name: provider.provider_name
            }
        });
    } catch {
        return {};
    }

}

const MoviesChoice = async (providerId, genreId) => {
    //URL formation
    const url = new Url();

    url.addParam('with_watch_providers', providerId);
    url.addParam('with_genres', genreId);

    url.addParam('page', randomPage(500));
    let movies = await fetchMovies(url);

    if(movies.results.length === 0){
        url.addParam('page', randomPage(movies.total_pages));
        movies = await fetchMovies(url);
    }

    if (movies.total_pages == 0){
        return [];
    }

    //Filter movies by existence of not null overview inside the object
    const filteredMovies = movies.results.filter((movie) => {
        if(movie.overview !== '')
            return movie;
    });

    //Ramdomly fetch 4 movies inside what we have
    if(filteredMovies.length > 4){
        const selectedMovies = [];
        for(let i = 0; i < 4; i++){
            const index = Math.floor(Math.random() * filteredMovies.length);
            selectedMovies.push(filteredMovies.splice(index, 1)[0]);
        }
        return await dataPresentation(selectedMovies);
    }
    return await dataPresentation(filteredMovies);
}

module.exports = {
    MoviesChoice:  MoviesChoice
};