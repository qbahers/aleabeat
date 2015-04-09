'use strict';

angular
    .module('aleabeat-app')
    .controller('TracksController', TracksController);

TracksController.$inject = ['$scope', 'Track', 'Account', 'User', '$routeParams', '$location'];

function TracksController ($scope, Track, Account, User, $routeParams, $location) {
    $scope.like = true;

    $scope.init = function () {
        Track.get({ _id: $routeParams._id }, function (track) {
            SC.oEmbed(
                'http://api.soundcloud.com/tracks/' + track.id,
                { auto_play: true, show_comments: false },
                document.getElementById('player')
            );

            Account.get({}, function (account) {
                if (account._id !== undefined) {
                    User.get({ _id: account._id }, function (user) {
                        var tracks = user.favoriteTracks;

                        // TODO: Check if there is a better way to figure out if the
                        // track being played has already been favorited
                        for (var i = 0; i < tracks.length; i += 1) {
                            if (tracks[i].details._id === track._id) {
                                $scope.like = false;
                                break;
                            }
                        }
                    });
                }
            });
        });
    };

    $scope.init();

    $scope.upvote = function () {
        Track.get({ _id: $routeParams._id }, function (track) {
            track.upvotes = ($scope.like) ? track.upvotes + 1 : track.upvotes - 1;
            track.$update();
        });

        Account.get({}, function (account) {
            if (account._id !== undefined) {
                User.get({ _id: account._id }, function (user) {
                    var favorites = [];
                    user.favoriteTracks.forEach (function (track) {
                        var favorite = {
                                details: track.details._id,
                                _id:     track._id,
                                date:    track.date
                            };

                        favorites.push(favorite);
                    });

                    if ($scope.like) {
                        favorites.push({ details: $routeParams._id });
                    }
                    else {
                        var index = favorites
                                        .map(function(e) { return e.details; })
                                        .indexOf($routeParams._id);

                        favorites.splice(index, 1);
                    }

                    user.favoriteTracks = favorites;
                    user.$update();

                    $scope.like = ($scope.like) ? false : true;
                });
            }
        });
    };

    $scope.next = function () {
        Track.query(function (tracks) {
            var next_track = tracks[Math.floor(Math.random()*tracks.length)];
            $location.path('/' + next_track._id);
        });
    };
}