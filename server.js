'use strict';
import React from 'react';
import axios from 'axios';
import Weather from './Weather.js'
import Movie from './Movie.js'
import Movies from './Movies.js';

//  REQUIRE

require('dotenv').config();
// let data = require('./data/weather.json');
const express = require('express');
const cors = require('cors');
const axios = require('axios');

//USE

const app = express();
<Weather/>'use strict';

//  REQUIRE

// let data = require('./data/weather.json');
// const axios = require('axios');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const handleGetWeather = require('./modules/weather');
const handleGetMovies = require('./modules/movie');

//USE

const app = express();

//  PORT

app.use(cors());
const PORT = process.env.PORT || 3002;

// ROUTES



app.get('/', (req, res) => {
  res.status(200).send('Hello there!');
});

app.get('/weather', handleGetWeather);
app.get('/movies', handleGetMovies);

// TRUST SHEYNA IT WORKS

app.get('*', (request, response) => {
  response.send('The thing you are looking for doesn\'t exist');
});

app.use((error, request, response, next) => {
  console.log(error.message)
  response.status(500).send(error.message)
});

// CLASSES



// LISTEN 

app.listen(PORT, () => console.log(`listening on ${PORT}`));
<Movie/>

//  PORT

app.use(cors());
const PORT = process.env.PORT || 3002;

// ROUTES







// TRUST SHEYNA IT WORKS

app.get('*', (request, response) => {
  response.send('The thing you are looking for doesn\'t exist');
});

// CLASSES



// LISTEN 

app.listen(PORT, () => console.log(`listening on ${PORT}`));
