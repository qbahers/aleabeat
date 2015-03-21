angular
    .module('xplore-app')
    .controller('TracksController', TracksController);

TracksController.$inject = ['$scope', 'Track', 'User', '$routeParams', '$location'];

function TracksController ($scope, Track, User, $routeParams, $location) {
    var disableUpvoteButton = false;

    $scope.init = function () {
        Track.get({ _id: $routeParams._id }, function (track) {
            SC.oEmbed(
                "http://api.soundcloud.com/tracks/" + track.id,
                { auto_play: true, show_comments: false },
                document.getElementById("player")
            );

            // Disclaimer: The user id is hardcoded for now, until an
            // authentication system is implemented.
            User.get({ _id: '550c0bd1a757f45a02db6fe5' }, function (user) {
                tracks = user.favoriteTracks;

                // TODO: Check if there is a better way to figure out if the
                // track being played has already been favorited
                for (i = 0; i < tracks.length; i++) {
                    if (tracks[i]._id === track._id) {
                        disableUpvoteButton = true;
                        break;
                    }
                }
            });
        });
    };

    $scope.init();

    $scope.upvote = function () {
        Track.get({ _id: $routeParams._id }, function (track) {
            track.upvotes += 1;
            track.$update();
        });

        // Disclaimer: The user id is hardcoded for now, until an
        // authentication system is implemented.
        User.get({ _id: "550c0bd1a757f45a02db6fe5" }, function (user) {
            var favorites = [];
            user.favoriteTracks.forEach (function (track) {
                favorites.push(track._id);
            });
            favorites.push($routeParams._id);

            user.favoriteTracks = favorites;
            user.$update();

            disableUpvoteButton = true;
        });
    };

    $scope.next = function () {
        Track.query(function (tracks) {
            var next_track = tracks[Math.floor(Math.random()*tracks.length)];
            $location.path('/' + next_track._id);
        });
    };

    $scope.isDisabled = function () {
        return disableUpvoteButton;
    };
};