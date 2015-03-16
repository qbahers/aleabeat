var mongoose = require('mongoose');

module.exports = mongoose.model('Track', {
  id:       Number,
  title:    String, 
  username: String,
  upvotes:  { type: Number, default: 0 }
});