var Track = require('../models/track');

module.exports.list = function (req, res) {
  Track.find({}, function (err, results) {
    res.json(results);
  });
}