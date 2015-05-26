var express      = require('express'),
    session      = require('express-session'),
    compression  = require('compression'),
    morgan       = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser');

module.exports = function (app, passport) {
  app.use(compression({
    threshold: 512
  }));
  app.use(morgan('dev'));
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

  app.use('/client', express.static(__dirname + '/../../client'));
}