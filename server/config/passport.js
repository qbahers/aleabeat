var passport         = require('passport'),
    TwitterStrategy  = require('passport-twitter').Strategy,
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
      return done(null, profile);
      //User.findOrCreate(..., function(err, user) {
      //  if (err) { return done(err); }
      //  done(null, user);
      //});
    }
  ));
}