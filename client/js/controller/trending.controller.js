angular
    .module('xplore-app')
    .controller('TrendingController', TrendingController);

TrendingController.$inject = ['$scope', '$rootScope', 'Account', 'Track'];

function TrendingController ($scope, $rootScope, Account, Track) {
    Account.get({}, function (account) {
        $rootScope.authenticated = (account._id !== undefined);
    });

    $scope.tracks = [];

    Track.query(function (result) {
        $scope.tracks = result;
    });
};