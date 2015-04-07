var User = require('../models/user');

module.exports.update = function (req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, result) {
    res.json(result);
  });
}

module.exports.read = function (req, res) {
  User
  .findById(req.params.id)
  .populate('favoriteTracks.details')
  .exec(function (err, result) {
    res.json(result);
  })
};