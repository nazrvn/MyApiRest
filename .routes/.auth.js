const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

/* router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout); */

 module.exports = router;



const express = require("express");
const mysql = require("mysql");
const dotenv = require('dotenv')

dotenv.config({path: './.env'})

const app = express();
app.use(express.json())



// Create a new user
app.post("/user", (req, res) => {
    console.log(req.body)
    const { name, password, role, email } = req.body;
    const newUser = { name, password, role, email };
  
    db.query("INSERT INTO users SET ?", newUser, (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create a user" });
      } else {
        res.status(201).json({ message: "User created successfully" });
      }
    });
  });

// Found all users
app.get("/users", (req, res) =>{
    db.query("SELECT * FROM users", (error, results)=>{
        if(error){
            console.log(error);
            res.status(500).json({error: "Failed to found users"})
        }
        else{
            res.status(200).json(results)
        }
    })

})

// Delete part

app.delete("/users/:id", (req, res) => {
    const id = req.params.id
    db.query("DELETE FROM users WHERE id = ? ",id,  (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to delete a user" });
      } 
      else if(result.affectedRows === 0){
        res.status(404).json({ message: "User not found" });
      }
      else{
        res.status(200).json({message:'User deleted successfuly'})
      }
    }); 
  });


// Update
app.put("/users/", (req, res) => {
    const id = req.params.id
    const {name, password, role, email } = req.body
    const update = { name, password, role, email };

    db.query("UPDATE users set ? WHERE id = ? ",id,update, (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to modifie user information " });
      } 
      else{
        res.status(200).json({message:'User modifced successfuly'})
      }
    }); 
  });

app.listen(3000, ()=>{
    console.log("Server running on port 3000");
})
app.use(express.json());

