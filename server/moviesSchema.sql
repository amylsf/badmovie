CREATE DATABASE movies;

USE movies;

CREATE TABLE movies (id int NOT NULL PRIMARY KEY AUTO_INCREMENT, title varchar(255) NOT NULL, release_date varchar(30) NOT NULL, rating int NOT NULL, image varchar(255) NOT NULL);