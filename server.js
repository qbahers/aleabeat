var express          = require('express'),
    app              = express(),
    bodyParser       = require('body-parser'),
    mongoose         = require('mongoose'),
    tracksController = require('./server/controllers/tracks-controller');
    usersController  = require('./server/controllers/users-controller');

mongoose.connect('mongodb://localhost:27017/xplore');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

app.use('/client', express.static(__dirname + '/client'));

app.get('/api/tracks',     tracksController.list);
app.get('/api/tracks/:id', tracksController.read);
app.put('/api/tracks/:id', tracksController.update);

app.get('/api/users/:id', usersController.read);

app.listen(3000, function() {
  console.log('I\'m Listening...');
});