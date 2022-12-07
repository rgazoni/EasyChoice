const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

require('dotenv').config();
require('./Database');

const Url = require('./Controllers/Url.js');
const FetchProviderId = require('./Controllers/Provider.js');

const app = express();
app.use(bodyParser.json());




app.get('/api/movies', async (req, res) => {
    const { providerId, genreId } = req.query;

    //URL formation
    const url = new Url();
    url.addParam('with_watch_providers', providerId);
    url.addParam('with_genres', genreId);

    //Axios GET request themoviedb  API
    const movies = await axios.get(url.toString(),
    { headers: { 'Accept-Encoding': 'application/json' } })
    .then((response) => { return response.data; });

    //TODO Refine data


    //Send Data back to client
    console.log(movies);
    res.send(movies);
});


app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`); 
});