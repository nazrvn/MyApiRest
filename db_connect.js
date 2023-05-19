const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config({ path: './.env'});

// Configuration de la connexion MySQL
const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

// Établir la connexion à la base de données MySQL
connection.connect(err => {
  if (err) throw err;
  console.log('Connecté à la base de données MySQL');
});

module.exports = connection;