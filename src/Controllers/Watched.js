const { UserMovies } = require('../Database/Schema/UserMovies');
const { Authentication } = require('./Access/Authentication.js');

const postWatched = async (req, res) => {
    
    const response = await Authentication(req, res);
    const movie = req.body;

    if(!response.status){
        return response;
    }

    const userId = response.data.id;

    const Find = await UserMovies.find({ userId: userId })
        .then(response => {
            //console.log(response);
            return response; })
        .catch(err => {
            return { err: err }
    });

    if(Find.length === 0) {
        const userMovies = new UserMovies({
            userId: userId,
            moviesWatched: [ movie ]
        });
        await userMovies.save();
    } else {
        Find[0].moviesWatched.push(movie);
        //console.log(Find[0]);
        await Find[0].save();
    }

    return {
        status: true,
        message: 'Success',
        data: ''
    }

}

const getWatched = async (req, res) => {
    const response = await Authentication(req, res);

    if(!response.status){
        return response;
    }

    const userId = response.data.id;

    const Find = await UserMovies.find({ userId: userId })
        .then(response => {
            //console.log(response);
            return response; })
        .catch(err => {
            return { err: err }
    });
    
    if(Find.length === 0) {
        return {
            status: true,
            data: []
        }
    }

    return {
        status: true,
        data: Find[0].moviesWatched
    }

}

const delMovieWatched = async (req, res) => {
    
    const response = await Authentication(req, res, next);
    const movieId = req.body.movieId;

    if(!response.status){
        return response;
    }

    const userId = response.data.id;

    const Find = await UserMovies.find({ userId: userId })
        .then(response => {
            //console.log(response);
            return response; })
        .catch(err => {
            return { err: err }
    });

    Find[0].moviesWatched

    const movie = movies.find(movie => {
        if(movie.id === movieId) {
            return movie;
        }
    });
    Find[0].moviesWatched.pop(movie);
    await await Find[0].save();


    return {
        status: true,
        message: 'Success',
        data: ''
    }

}

module.exports = {
    getWatched: getWatched,
    postWatched: postWatched,
    delMovieWatched: delMovieWatched
};