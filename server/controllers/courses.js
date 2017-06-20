let courses = require('../courses');

module.exports = {
  get: (req, res) => {
    let limit;
    let skip = +req.query.skip || 0;

    if (req.query.limit) {
      limit = skip + +req.query.limit;
    }

    const result = courses.filter(course => course.name.indexOf(req.query.name || '') > -1);
    res.send({items: result.slice(skip, limit), count: result.length});
  },
  delete: (req, res) => {
    courses = courses.filter(course => course.id !== +req.params.id);
    console.log(courses.length);

    res.send(true);
  }
};