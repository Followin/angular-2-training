const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const coursesController = require('./controllers/courses');
const usersController = require('./controllers/users');

const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve('./dist')));

app.get('/api/courses', coursesController.get);
app.get('/auth', usersController.get);
app.post('/auth', usersController.login);
app.get('*', (req, res) => {
  res.sendFile(path.resolve('./dist/index.html'));
});

app.listen(port, () => {
  console.log(`application started and listens on port ${port}...`)
});