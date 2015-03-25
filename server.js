var express          = require('express'),
    app              = express(),
    //cookieParser     = require('cookie-parser'),
    bodyParser       = require('body-parser'),
    mongoose         = require('mongoose'),
    session          = require('express-session'),
    passport         = require('passport'),
    TwitterStrategy  = require('passport-twitter').Strategy,
    configAuth       = require('./server/config/auth'),
    tracksController = require('./server/controllers/tracks-controller'),
    usersController  = require('./server/controllers/users-controller');

mongoose.connect('mongodb://localhost:27017/xplore');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new TwitterStrategy({
    consumerKey: configAuth.TWITTER_CONSUMER_KEY,
    consumerSecret: configAuth.TWITTER_CONSUMER_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    console.log(profile);
    return done(null, profile);
    //User.findOrCreate(..., function(err, user) {
    //  if (err) { return done(err); }
    //  done(null, user);
    //});
  }
));

//app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/client', express.static(__dirname + '/client'));

app.get('/api/tracks',     tracksController.list);
app.get('/api/tracks/:id', tracksController.read);
app.put('/api/tracks/:id', tracksController.update);

app.get('/api/users/:id', usersController.read);
app.put('/api/users/:id', usersController.update);

app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { successRedirect: '/',
                                     failureRedirect: '/login' }));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

//app.get('/logout', function(req, res){
//  req.logout();
//  res.redirect('/');
//});

app.listen(3000, function() {
  console.log('I\'m Listening...');
});