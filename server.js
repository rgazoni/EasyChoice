const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const PORT = 4000;

const app = express();
app.use(bodyParser.json());


app.get('/api/movies', (req, res) => {
    const { type, genre, platform } = req.query; 
    res.send();
});
  

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`); 
 });