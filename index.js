const express = require('express');
const router = require('./routes/routes');
const app = express();


app.use('/', router);
app.post('/users', router);
app.get('/users', router);
app.get('/users/:userId', router);
app.put('/users/:userId', router);
app.delete('/users/:userId', router);


app.listen(4000, () => {
  console.log('Serveur démarré sur le port 4000');
});