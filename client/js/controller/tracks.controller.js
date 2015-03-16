angular
    .module('xplore-app')
    .controller('TracksController', TracksController);

TracksController.$inject = ['$scope', 'Track', '$routeParams', '$location'];

function TracksController ($scope, Track, $routeParams, $location) {
    $scope.tracks = [];

    Track.query(function (result) {
        $scope.tracks = result;

        $scope.next = function () {
            var track     = $scope.tracks[Math.floor(Math.random()*($scope.tracks).length)];
            var track_id  = track.id;

            $location.path('/' + track_id);
        };

        $scope.init = function () {
            SC.initialize({
                client_id: 'YOUR_CLIENT_ID'
            });

            var track_url = "http://api.soundcloud.com/tracks/" + $routeParams.trackId;

            SC.oEmbed(
                track_url,
                {auto_play: false, show_comments: false},
                document.getElementById("player")
            );
        }

        $scope.init();

        $scope.upvote = function () {
            Track.get({id: $routeParams.trackId}, function (track) {
                track.upvotes = track.upvotes + 1;
                track.$update();
            });
        }
    });
};