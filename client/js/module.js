angular.module('xplore-app', ['ngRoute', 'ngResource', 'angularMoment']);

app.constant('angularMomentConfig', {
    preprocess: 'utc',
    timezone: 'Europe/London'
});