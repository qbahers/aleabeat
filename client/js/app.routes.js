angular
    .module('xplore-app')
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/trending', {
                templateUrl: 'client/partials/trending.html',
                controller:  'TrendingController'
            })
            .when('/:trackId', {
                templateUrl: '/client/partials/player.html',
                controller:  'TracksController'
            })
            //.otherwise({
            //    redirectTo: '/'
            //});
    }]);