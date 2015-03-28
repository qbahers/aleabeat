var passport         = require('passport'),
    tracksController = require('./../controllers/tracks-controller'),
    usersController  = require('./../controllers/users-controller');

module.exports = function(app, passport) {
  app.get('/api/tracks',     tracksController.list);
  app.get('/api/tracks/:id', tracksController.read);
  app.put('/api/tracks/:id', tracksController.update);

  app.get('/api/users/:id', usersController.read);
  app.put('/api/users/:id', usersController.update);

  //app.get('/api/users/me', ensureAuthenticated, function(req, res){
  app.get('/account', ensureAuthenticated, function(req, res){
    //res.render('account', { user: req.user });
    res.json(req.user);
  });

  app.get('/auth/twitter', passport.authenticate('twitter'));

  app.get('/auth/twitter/callback', 
    passport.authenticate('twitter', { successRedirect: '/',
                                       failureRedirect: '/login' }))

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/')
  }
}