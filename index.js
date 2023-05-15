const express = require('express');
const app = express();
const mysql = require('mysql');
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config({path: './.env'});

app.get('/', (req, res) => {
   res.render('index');
})

app.get('/login', (req, res) => {
    res.render('login');
 })

app.get('/register', (req, res) => {
    res.render('register');
 })

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

db.on('error', (err) => {
    console.error('Database connection error:', err);
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());


app.set('view engine', 'hbs');

db.connect( (error) => {
    if(error) { console.log(error) }
    else { console.log('MySql Connected...') }
} );

//define routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(3000, () =>
  console.log('Server ON: http://localhost:3000')
);
