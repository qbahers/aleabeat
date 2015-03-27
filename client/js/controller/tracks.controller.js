angular
    .module('xplore-app')
    .controller('TracksController', TracksController);

TracksController.$inject = ['$scope', 'Track', 'Account', 'User', '$routeParams', '$location'];

function TracksController ($scope, Track, Account, User, $routeParams, $location) {
    $scope.like = "Like";

    $scope.init = function () {
        Track.get({ _id: $routeParams._id }, function (track) {
            SC.oEmbed(
                "http://api.soundcloud.com/tracks/" + track.id,
                { auto_play: true, show_comments: false },
                document.getElementById("player")
            );

            Account.get({}, function (account) {
                User.get({ _id: account._id }, function (user) {
                    tracks = user.favoriteTracks;

                    // TODO: Check if there is a better way to figure out if the
                    // track being played has already been favorited
                    for (i = 0; i < tracks.length; i++) {
                        if (tracks[i]._id === track._id) {
                            $scope.like = "Unlike";
                            break;
                        }
                    }
                });
            });
        });
    };

    $scope.init();

    $scope.upvote = function () {
        Track.get({ _id: $routeParams._id }, function (track) {
            track.upvotes = ($scope.like === "Like") ? track.upvotes + 1 : track.upvotes - 1;
            track.$update();
        });

        Account.get({}, function (account) {
            User.get({ _id: account._id }, function (user) {
                var favorites = [];
                user.favoriteTracks.forEach (function (track) {
                    favorites.push(track._id);
                });

                if ($scope.like === "Like") {
                    favorites.push($routeParams._id);
                }
                else {
                    var index = favorites.indexOf($routeParams._id);
                    favorites.splice(index, 1);
                }

                user.favoriteTracks = favorites;
                user.$update();

                $scope.like = ($scope.like === "Like") ? "Unlike" : "Like";
            });
        });
    };

    $scope.next = function () {
        Track.query(function (tracks) {
            var next_track = tracks[Math.floor(Math.random()*tracks.length)];
            $location.path('/' + next_track._id);
        });
    };
};