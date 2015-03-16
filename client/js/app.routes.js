angular
    .module('xplore-app')
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/client/partials/player.html',
                controller:  'TracksController'
            })
            .when('/trending', {
                templateUrl: 'client/partials/trending.html',
                controller:  'TrendingController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);