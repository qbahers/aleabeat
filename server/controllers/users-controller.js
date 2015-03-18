var User = require('../models/user');

module.exports.read = function (req, res) {
	User
	.findById(req.params.id)
	.populate('favoriteTracks')
	.exec(function (err, result) {
		res.json(result);
	})
};