const express = require('express');
const jwt = require('jsonwebtoken');
const connection = require('../db_connect');

// Middleware pour vérifier si l'utilisateur est connecté
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    
    // Vérifier le jeton
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);

    // Vérifier si l'utilisateur existe toujours
    connection.query('SELECT * FROM users WHERE userId = ?', [decoded.id], (error, results) => {
      if (error || !results) {
        // L'utilisateur n'existe pas ou une erreur s'est produite
        return next();
      }
      req.user = results[0];
      return next();
    });
  } else {
    next();
  }
};