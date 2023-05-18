'use strict';

//  REQUIRE

require('dotenv').config();
// let data = require('./data/weather.json');
const express = require('express');
const cors = require('cors');
const axios = require('axios');

//USE

const app = express();


//  PORT

app.use(cors());
const PORT = process.env.PORT || 3002;

// ROUTES

app.get('/weather', async (request, response, next) => {
  try {
    // console.log(request.query.cityData)
    // let { lat, lon } = request.query;
    // let searchQuery = request.query.cityData

    let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&units=I&days=5&lat=${request.query.lat}&lon=${request.query.lon}`
    let weatherData = await axios.get(url);

    let weatherMap = parseWeathers(weatherData.data);
    weatherMap.then(weather => {
      response.status(200).send(weather);
    })

  } catch (error) {
    next(error);
  }
});

app.get('/movies', async (request, response, next) => {
  try {
    console.log("request querey hERE: ", request.query);
    let city = request.query.cityName;
    let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`
    let movieData = await axios.get(movieURL);
    // console.log("movieDATA HERE: ", movieData.data.results);

    let movieMap = parseMovies(movieData.data.results);
    console.log("HERE MOVIES: ", movieMap);
    movieMap.then(movie => {
      response.status(200).send(movie);
    })

  } catch (error) {
    console.log('HERE: ', error);
    next(error)
  }
});

function parseWeathers(weatherData) {
  try {
    const weatherSummarize = weatherData.data.map(oneDay => {
      return new Forecast(oneDay);
    });
    return Promise.resolve(weatherSummarize);
  } catch (error) {
    return Promise.reject(error);
  }
}

function parseMovies(moviesData) {
  // console.log("movdiesDATA HERE: ", moviesData);
  try {
    const movieSummarize = moviesData.map(oneMovie => {
      return new Movies(oneMovie);
    });
    return Promise.resolve(movieSummarize);
  } catch (error) {
    return Promise.reject(error);
  }
}



// TRUST SHEYNA IT WORKS

app.get('*', (request, response) => {
  response.send('The thing you are looking for doesn\'t exist');
});

// CLASSES

class Forecast {
  constructor(day) {
    this.date = day.valid_date;
    this.description = day.weather.description;
    this.high = day.high_temp;
    this.low = day.low_temp;
  }
}

class Movies {
  constructor(movie) {
    this.title = movie.original_title;
    this.overview = movie.overview;
    this.averageVotes = movie.vote_average;
    this.totalVotes = movie.vote_count;
    this.image_url = movie.poster_path;
    this.popularity = movie.popularity;
    this.releaseDate = movie.release_date;
  }
}

// LISTEN 

app.listen(PORT, () => console.log(`listening on ${PORT}`));
