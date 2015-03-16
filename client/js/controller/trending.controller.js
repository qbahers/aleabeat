angular
    .module('xplore-app')
    .controller('TrendingController', TrendingController);

TrendingController.$inject = ['$scope', '$http'];

function TrendingController ($scope, $http) {
	$http.get('/client/tracks.json').success(function(data) {
		$scope.tracks = data;
    });
};