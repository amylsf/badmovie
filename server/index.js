var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var app = express();
var token = require('../config.js').API_TOKEN;
var axios = require('axios');
var db = require('./database.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

let getMovies = (genre, callback) => {
  options = {
      "async": true,
      "crossDomain": true,
      "url": `https://api.themoviedb.org/3/discover/movie?with_genres=${genre}&include_video=false&include_adult=false&sort_by=vote_average.asc&language=en-US&api_key=${token}`,
      "method": "GET",
      "headers": {},
      "data": "{}"
  }

  request.get(options, function(err, response, body) {
    if (err) {
      console.log(err);
    } else {
      callback(JSON.parse(body))
    }
  })
}

app.get('/search', function(req, res) {
  getMovies(req.query.genre, function(data) {
    res.status(200).send(JSON.stringify(data.results));
  })
})

let getGenres = (callback) => {
  options = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=c35899dd4109912555b5903cae3a0302",
    "method": "GET",
    "headers": {},
    "data": "{}"
  }

  request.get(options, function(err, response, body) {
    if (err) {
      console.log(err);
    } else {
      callback(JSON.parse(body));
    }
  })
}

app.get('/favorites', function(req, res) {
  db.getAllFavorites((data) => {
    res.status(200).send(JSON.stringify(data));
  })
})

app.get('/genres', function(req, res) {
  getGenres(function(data) {
    res.status(200).send(JSON.stringify(data.genres));
  })
})

app.post('/save', function(req, res) {
  let params = [req.body.item.id, req.body.item.title, req.body.item.release_date, req.body.item.vote_average, req.body.item.poster_path];
  db.saveFavorite(params, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.sendStatus(201);
    }
  })
})

app.post('/delete', function(req, res) {
  db.deleteFavorite(req.body.item.movieId, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.sendStatus(201);
    }
  })
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
