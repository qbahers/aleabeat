angular
    .module('xplore-app')
    .controller('TrendingController', TrendingController);

TrendingController.$inject = ['$scope', 'Track'];

function TrendingController ($scope, Track) {
    $scope.tracks = [];

    Track.query(function (result) {
        $scope.tracks = result;
    });
};