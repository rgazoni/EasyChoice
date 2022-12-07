const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const Url = require('./Url.js');

const app = express();
app.use(bodyParser.json());

providers = {
    "netflix": {
        "logo_path": "/9A1JSVmSxsyaBK4SUFsYVqbAYfW.jpg",
        "provider_name": "Netflix",
        "provider_id": 8
    },
    "amazon_prime": {
        "logo_path": "/68MNrwlkpF7WnmNPXLah69CR5cb.jpg",
        "provider_name": "Amazon Prime Video",
        "provider_id": 119
    },
    "hbo": {
        "logo_path": "/aS2zvJWn9mwiCOeaaCkIh4wleZS.jpg",
        "provider_name": "HBO Max",
        "provider_id": 384
    },
    'disney_plus': {
        "logo_path": "/dgPueyEdOwpQ10fjuhL2WYFQwQs.jpg",
        "provider_name": "Disney Plus",
        "provider_id": 337
    }
};


app.get('/api/movies', async (req, res) => {
    const url = new Url();
    const { platform } = req.query;

    const providerId = providers[platform].provider_id;

    url.addParam('with_watch_providers', providerId);

    const movies = await axios.get(url.getUrl(),
    { headers: { 'Accept-Encoding': 'application/json' } })
    .then((response) => { return response.data; });

    console.log(movies);
    res.send(movies);
});


app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`); 
 });