var express  = require('express'),
    mongoose = require('mongoose'),
    passport = require('passport');

var app  = express(),
    port = process.env.PORT || 3000;

mongoose.connect('mongodb://127.0.0.1:27017/aleabeat');

require('./server/config/passport')(passport);

require('./server/config/express')(app, passport);

require('./server/routes/routes.js')(app, passport);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

app.listen(port);
console.log('Express app started on port ' + port);