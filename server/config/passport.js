var passport         = require('passport'),
    TwitterStrategy  = require('passport-twitter').Strategy,
    User             = require('./../models/user'),
    configAuth       = require('./auth');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  passport.use(new TwitterStrategy({
      consumerKey: configAuth.TWITTER.CONSUMER_KEY,
      consumerSecret: configAuth.TWITTER.CONSUMER_SECRET,
      callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
    },
    function(token, tokenSecret, profile, done) {
      console.log(profile);
      
      User.findOne({ 'twitter.id': profile.id }, function(err, user) {
        if (err)
          return done(err);

        if (user) {
          return done(null, user);
        }
        else {
          var newUser = new User();

          newUser.twitter.id          = profile.id;
          newUser.twitter.token       = token;
          newUser.twitter.username    = profile.username;
          newUser.twitter.displayName = profile.displayName;

          newUser.save(function(err) {
            if (err)
              throw err;
            return done(null, newUser);
          });
        }
      });
    }
  ));
}