DROP TABLE IF EXISTS project_db;
CREATE DATABASE project_db;

USE project_db;

-- Create the users table
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(30) NOT NULL,
  password VARCHAR(30) NOT NULL
);