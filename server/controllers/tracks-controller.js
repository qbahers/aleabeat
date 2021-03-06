var Track = require('../models/track');

module.exports.list = function (req, res) {
  Track.find({}, function (err, results) {
    res.json(results);
  });
};

module.exports.update = function (req, res) {
  Track.findByIdAndUpdate(req.params.id, req.body, function (err, result) {
    res.json(result);
  });
}

module.exports.read = function (req, res) {
  Track.findById(req.params.id, function (err, result) {
    res.json(result);
  });
};