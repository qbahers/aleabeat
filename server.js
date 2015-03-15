var express = require('express'),
    app     = express();

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

app.use('/client', express.static(__dirname + '/client'));

app.listen(3000, function() {
  console.log('I\'m Listening...');
});