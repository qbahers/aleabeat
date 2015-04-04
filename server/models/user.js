var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var userSchema = new Schema({
  twitter: {
    id:              String,
    token:           String,
    username:        String,
    displayName:     String,
    profileImageUrl: String
  },
  favoriteTracks: [{
    details: {
      type: Schema.Types.ObjectId, 
      ref:  'Track'
    },
    date: { type: Date, default: Date.now }
  }]
});

var User = mongoose.model('User', userSchema);

module.exports = User;