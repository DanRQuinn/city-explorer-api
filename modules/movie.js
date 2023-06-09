'use strict';
const axios = require('axios');

let cache = require('./cache.js');

async function getMovies(request, response, next) {
  let city = request.query.cityName;
  const key = 'movies-' + city;
  let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    let movieData = await axios.get(movieURL);

    try {
      cache[key].data = movieData.data.results;
      let movieDataToSend = cache[key].data.map(object => {
        return new Movies(object);
      });
      response.status(200).send(movieDataToSend)
    } catch (error) {
      next(error)
    }
  }
};

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

module.exports = getMovies;
