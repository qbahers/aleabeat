var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var trackSchema = new Schema({
  id:      Number,
  title:   String,
  artist:  String,
  upvotes: { type: Number, default: 0 }
});

var Track = mongoose.model('Track', trackSchema);

module.exports = Track;