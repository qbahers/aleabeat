angular
    .module('xplore-app')
    .controller('TracksController', TracksController);

TracksController.$inject = ['$scope', 'Track', '$routeParams', '$location'];

function TracksController ($scope, Track, $routeParams, $location) {
    $scope.init = function () {
        SC.initialize({
            client_id: 'YOUR_CLIENT_ID'
        });

        Track.get({ _id: $routeParams._id }, function (track) {
            SC.oEmbed(
                "http://api.soundcloud.com/tracks/" + track.id,
                { auto_play: true, show_comments: false },
                document.getElementById("player")
            );
        });
    };

    $scope.init();

    $scope.upvote = function () {
        Track.get({ _id: $routeParams._id }, function (track) {
            track.upvotes += 1;
            track.$update();
        });
    };

    $scope.next = function () {
        Track.query(function (tracks) {
            var next_track = tracks[Math.floor(Math.random()*tracks.length)];
            $location.path('/' + next_track._id);
        });
    };
};