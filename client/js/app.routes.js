angular
    .module('xplore-app')
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'client/partials/trending.html',
                controller:  'TrendingController'
            })
            .when('/:_id', {
                templateUrl: '/client/partials/player.html',
                controller:  'TracksController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);