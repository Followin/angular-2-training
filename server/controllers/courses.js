const courses = require('../courses');

module.exports = {
  get: (req, res) => {
    let limit;
    let skip = +req.query.skip || 0;

    if (req.query.limit) {
      limit = skip + +req.query.limit;
    }

    res.send(courses
      .filter(course => course.name.indexOf(req.query.name || '') > -1)
      .slice(skip, limit));
  }
}