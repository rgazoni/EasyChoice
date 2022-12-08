const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();
require('./Database');

const { FetchProviders } = require('./Controllers/Provider.js');
const { FetchGenres } = require('./Controllers/Genre.js');
const { MoviesChoice } = require('./Controllers/MoviesChoice.js');

const app = express();
app.use(bodyParser.json());

app.get('/genres', async (req,res) => {
    const genres = await FetchGenres();
    //console.log(genres);
    res.send(genres);
})

app.get('/providers', async (req,res) => {
    const provider = await FetchProviders();
    //console.log(provider);
    res.send(provider);
})

app.get('/api/movies', async (req, res) => {
    const { providerId, genreId } = req.query;
    const movies = await MoviesChoice(providerId, genreId);
    res.send(movies);
});

app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`); 
});