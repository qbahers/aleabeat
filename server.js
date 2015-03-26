var express          = require('express'),
    app              = express(),
    cookieParser     = require('cookie-parser'),
    bodyParser       = require('body-parser'),
    mongoose         = require('mongoose'),
    session          = require('express-session'),
    passport         = require('passport');

mongoose.connect('mongodb://localhost:27017/xplore');

require('./server/config/passport')(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/client', express.static(__dirname + '/client'));

require('./server/routes/routes.js')(app, passport);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

app.listen(3000, function() {
  console.log('I\'m Listening...');
});