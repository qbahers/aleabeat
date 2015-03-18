var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  favoriteTracks: [{ type: Schema.Types.ObjectId, ref: 'Track' }]
});

var User = mongoose.model('User', userSchema);

module.exports = User;