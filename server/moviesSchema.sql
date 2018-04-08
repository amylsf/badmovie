CREATE DATABASE badmovies;

USE badmovies;

CREATE TABLE movies (id int NOT NULL PRIMARY KEY AUTO_INCREMENT, movieId int NOT NULL, title varchar(255) NOT NULL, release_date varchar(30) NOT NULL, vote_average int NOT NULL, poster_path varchar(255));