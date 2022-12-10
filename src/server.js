const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

require('dotenv').config();
require('./Database');

const { FetchProviders } = require('./Controllers/Provider.js');
const { FetchGenres } = require('./Controllers/Genre.js');
const { MoviesChoice } = require('./Controllers/MoviesChoice.js');
const { Signup } = require('./Controllers/Signup.js');
const { Login } = require('./Controllers/Login.js');
const { Authentication } = require('./Controllers/Authentication.js');
const { Watched } = require('./Controllers/Watched.js');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static(__dirname + '/client'));


app.get('/genres', async (req,res) => {
    const genres = await FetchGenres();
    //console.log(genres);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(genres);
})

app.get('/providers', async (req,res) => {
    const provider = await FetchProviders();
    //console.log(provider);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(provider);
})

app.get('/api/movies', async (req, res) => {
    const { providerId, genreId } = req.query;
    const movies = await MoviesChoice(providerId, genreId);
    res.send(movies);
});

app.post('/api/users/signup', async (req, res) => {
    const response = await Signup(req.body);
    //console.log(response);
    res.send(response);
});

app.post('/api/users/login', async (req, res) => {
    const response = await Login(req, res);
    //console.log(response);
    res.send(response);
});

// app.get('/api/users/watched', async (req, res, next) => {
//     const content = await Watched(req, res, next);
//     res.send('easychoice');
// });

app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`); 
});