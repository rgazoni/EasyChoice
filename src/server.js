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
    const url = new Url();
    const { platform } = req.query;

    console.log(platform);

    const { provider_id } = FetchProviderId(platform);

    url.addParam('with_watch_providers', provider_id);

    const movies = await axios.get(url.toString(),
    { headers: { 'Accept-Encoding': 'application/json' } })
    .then((response) => { return response.data; });

    //console.log(movies);
    res.send(movies);
});


app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`); 
});