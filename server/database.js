const mysql = require('mysql');
const mysqlConfig = {
  host: 'localhost',
  user: 'root', 
  database: 'badmovies'
};

const connection = mysql.createConnection(mysqlConfig);

const getAllFavorites = function(callback) {
  connection.query('select * from movies;', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      callback(data);
    }
  })
};

const saveFavorite = function(params, callback) {
  connection.query('INSERT INTO movies (movieId, title, release_date, vote_average, poster_path) VALUES (?, ?, ?, ?, ?)', params, (err, results) => {
    callback(err, results);
  })
};

const deleteFavorite = function(movieId, callback) {
  connection.query(`DELETE FROM movies WHERE movieId=${movieId}`, (err, results) => {
    callback(err, results);
  })
};

module.exports = {
  getAllFavorites,
  saveFavorite,
  deleteFavorite
};