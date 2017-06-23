const authors = require('../authors');

module.exports = {
  get: (req, res) => {
    res.send(authors);
  }
};