'use strict';

angular
    .module('aleabeat-app')
    .controller('TrendingController', TrendingController);

TrendingController.$inject = ['$scope', '$rootScope', 'Account', 'Track'];

function TrendingController ($scope, $rootScope, Account, Track) {
    Account.get({}, function (account) {
        $rootScope.authenticated = (account._id !== undefined);
        if (account.twitter !== undefined) {
          $rootScope.profileImageUrl = account.twitter.profileImageUrl;
        }
    });

    $scope.tracks = [];

    Track.query(function (tracks) {
        tracks.sort(function (trackA, trackB) { 
            return trackB.upvotes - trackA.upvotes;
        });

        $scope.tracks = tracks.slice(0, 5);
    });
}