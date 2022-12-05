const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const Url = require('./Url/Url.js');

const app = express();
app.use(bodyParser.json());

app.get('/api/movies', async (req, res) => {
    const { type, genre, platform } = req.query;

    const url = new Url();

    const movies = await axios.get(url, 
    { headers: { 'Accept-Encoding': 'application/json' } })
    .then((response) => { return response.data; });

    console.log(movies);
    res.send(movies);
});


app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`); 
 });