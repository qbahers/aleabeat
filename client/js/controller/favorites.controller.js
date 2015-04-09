'use strict';

angular
    .module('aleabeat-app')
    .controller('FavoritesController', FavoritesController);

FavoritesController.$inject = ['$scope', 'Account', 'User'];

function FavoritesController ($scope, Account, User) {

    $scope.favorites = [];

    Account.get({}, function (account) {
        if (account._id !== undefined) {
            User.get({ _id: account._id }, function (user) {
                var tracks = user.favoriteTracks;

                tracks.forEach(function(track) {
                    $scope.favorites.push(track);
                });
            });
        }
    });

    $scope.favoritedDate = function (favorite) {
        var date = new Date(favorite.date).getTime();
        return date;
    };
}