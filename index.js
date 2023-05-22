const express = require('express');
const app = express();
const router = require('./routes/routes');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.json());

app.use('/', router);
app.post('/users', router);
app.get('/users', router);
app.get('/users/:userId', router);
app.put('/users/:userId', router);
app.delete('/users/:userId', router);
app.post('/login', router);
//app.get('/me', router);

app.listen(4000, () => {
  console.log('Serveur démarré sur le port 4000');
});