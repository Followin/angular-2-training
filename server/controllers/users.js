const uuid = require('uuid/v1');
const users = require('../users');

module.exports = {
  get: function (req, res) {
    const user = users.find(user => user.token === req.headers.authorization);
    if (user) {
      res.send({
        name: user.login,
        token: user.token
      });
    } else {
      res.sendStatus(403);
    }
  },
  login: function (req, res) {
    const user = users.find(user => user.login === req.body.login && user.password === req.body.password);
    if (user) {
      user.token = uuid();

      res.send({
        name: user.login,
        token: user.token
      });
    } else {
      res.sendStatus(403);
    }
  }
};