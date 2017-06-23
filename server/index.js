const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const coursesController = require('./controllers/courses');
const usersController = require('./controllers/users');
const authorsController = require('./controllers/authors');

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger);
app.use(express.static(path.resolve('./dist')));

app.get('/api/courses', coursesController.get);
app.delete('/api/courses/:id', coursesController.delete);
app.get('/api/authors', authorsController.get);
app.get('/api/auth', usersController.get);
app.post('/api/auth', usersController.login);
app.get('*', (req, res) => {
  res.sendFile(path.resolve('./dist/index.html'));
});

app.listen(port, () => {
  console.log(`application started and listens on port ${port}...`)
});

function logger(req, res, next) {
  console.log(new Date(), req.originalUrl);
  next();
}