var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var app = express();
var token = require('../config.js').API_TOKEN;
var axios = require('axios');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

let getMovies = (callback) => {
  options = {
      "async": true,
      "crossDomain": true,
      "url": `https://api.themoviedb.org/3/discover/movie?include_video=false&include_adult=false&sort_by=vote_average.asc&language=en-US&api_key=${token}`,
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
  getMovies(function(data) {
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

app.get('/genres', function(req, res) {
  getGenres(function(data) {
    res.status(200).send(JSON.stringify(data));
  })

    //send back
})

app.post('/save', function(req, res) {

})

app.post('/delete', function(req, res) {

})
app.listen(3000, function() {
  console.log('listening on port 3000!');
});
