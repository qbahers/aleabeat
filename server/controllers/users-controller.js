var User = require('../models/user');

module.exports.update = function (req, res) {
  console.log(req);
  User.findByIdAndUpdate(req.params.id, req.body, function (err, result) {
    res.json(result);
  });
}

module.exports.read = function (req, res) {
	User
	.findById(req.params.id)
	.populate('favoriteTracks')
	.exec(function (err, result) {
		res.json(result);
	})
};