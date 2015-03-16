angular
    .module('xplore-app')
    .controller('TrendingController', TrendingController);

TrendingController.$inject = ['$scope', 'Track'];

function TrendingController ($scope, Track) {
	//$http.get('/client/tracks.json').success(function(data) {
	//	$scope.tracks = data;
    //});

    $scope.tracks = [];

    Track.query(function (result) {
        $scope.tracks = result;
    });
};