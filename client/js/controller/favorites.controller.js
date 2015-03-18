angular
    .module('xplore-app')
    .controller('FavoritesController', FavoritesController);

FavoritesController.$inject = ['$scope', 'User'];

function FavoritesController ($scope, User) {

    $scope.favorites = [];

    // Disclaimer: The user id is hardcoded for now, until an authentication
    // system is implemented.
    User.get({ _id: '550c0bd1a757f45a02db6fe5' }, function (user) {
        tracks = user.favoriteTracks;

        tracks.forEach(function(track) {
            $scope.favorites.push(track);
        });
    });
};