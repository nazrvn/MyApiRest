const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const connection = require('../db_connect');

const app = express();
app.use(express.json());

// Regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

// Ajouter un nouvel utilisateur
router.post('/users', (req, res) => {
    const newUser = req.body;
    
    if (!emailRegex.test(newUser.email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }
  
    if (!passwordRegex.test(newUser.password)) {
      return res.status(400).json({
        message:
          'Password must contain at least 8 characters, including at least one lowercase letter, one uppercase letter, and one digit'
      });
    }
  
    bcrypt.hash(newUser.password, 8, (err, hashedPassword) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'An error occurred while hashing the password' });
      }
  
      newUser.password = hashedPassword;
  
      connection.query('INSERT INTO users SET ?', newUser, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ message: 'An error occurred while creating the user' });
        }
  
        newUser.userId = result.insertId;
        res.status(201).json({ message: 'User successfully created' });
      });
    });
});
  
// Récupérer tous les utilisateurs
router.get('/users', (req, res) => {
    connection.query('SELECT * FROM users', (err, rows) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'An error occurred while retrieving users' });
      }
  
      res.json(rows);
    });
});
  
// Récupérer un utilisateur spécifique
router.get('/users/:userId', (req, res) => {
    const userId = req.params.userId;
    connection.query('SELECT * FROM users WHERE userId = ?', [userId], (err, rows) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'An error occurred while retrieving the user' });
      }
  
      if (rows.length === 0) {
        return res.status(404).json({ message: 'User was not found' });
      }
  
      res.json(rows[0]);
    });
});
  
// Mettre à jour un utilisateur existant
router.put('/users/:userId', (req, res) => {
    const userId = req.params.userId;
    const updatedUser = req.body;
  
    if (updatedUser.password && !passwordRegex.test(updatedUser.password)) {
      return res.status(400).json({
        message:
          'Password must contain at least 8 characters, including at least one lowercase letter, one uppercase letter, and one digit'
      });
    }
  
    if (updatedUser.password) {
      bcrypt.hash(updatedUser.password, 8, (err, hashedPassword) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: 'An error occurred while hashing the password' });
        }
  
        updatedUser.password = hashedPassword;
  
        connection.query('UPDATE users SET ? WHERE userId = ?', [updatedUser, userId], (err, result) => {
          if (err) {
            console.log(err);
            return res.status(400).json({ message: 'An error occurred while updating the user' });
          }
  
          if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
          }
  
          res.json(updatedUser);
        });
      });
    }
});
  
// Supprimer un utilisateur existant
router.delete('/users/:userId', (req, res) => {
    const userId = req.params.userId;
    connection.query('DELETE FROM users WHERE userId = ?', [userId], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ message: 'An error occurred while deleting the user' });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ message: 'User successfully deleted' });
    });
});

module.exports = router;
