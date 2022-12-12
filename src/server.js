const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const axios = require('axios');
const cors = require('cors');

require('dotenv').config();
require('./Database');

const { FetchProviders } = require('./Controllers/Provider.js');
const { FetchGenres } = require('./Controllers/Genre.js');
const { MoviesChoice } = require('./Controllers/MoviesChoice.js');
const { Signup } = require('./Controllers/Access/Signup.js');
const { Login } = require('./Controllers/Access/Login.js');
const { Logout } = require('./Controllers/Access/Logout.js');
const { getWatched, postWatched, delMovieWatched } = require('./Controllers/Watched.js');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());


app.use(express.static(__dirname + '/client'));
// app.use(express.static(__dirname));


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
    console.log(req.body);
    const response = await Signup(req.body);
    
    res.send(response);
});

app.post('/api/users/login', async (req, res) => {
    const response = await Login(req, res);
    //console.log(response);
    res.send(response);
});

app.get('/api/users/logout', async (req, res) => {
    Logout(req, res);
});

app.get('/api/users/watched', async (req, res, next) => {
    const content = await getWatched(req, res, next);
    //res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(content);
});

app.post('/api/users/watched', async (req, res) => {
    const content = await postWatched(req, res);
    //res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(content);
});

app.post('/api/users/watched/del', async (req, res) => {
    const content = await delMovieWatched(req, res);
    //res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(content);
});

app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`); 
});