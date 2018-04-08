const mysql = require('mysql');
const mysqlConfig = {
  host: 'localhost',
  user: 'root', 
  password: '', 
  database: 'badmovies'
};

const connection = mysql.createConnection(mysqlConfig);

const getAllFavorites = function(callback) {
  //get favorites from the database
};
const saveFavorite = function(callback) {
  //get favorites from the database
};
const deleteFavorites = function(callback) {
  //get favorites from the database
};
module.exports = {
  getAllFavorites,
  saveFavorite,
  deleteFavorite
};