angular
    .module('xplore-app')
    .controller('TracksController', TracksController);

TracksController.$inject = ['$scope', '$http'];

function TracksController ($scope, $http) {
    $http.get('/client/tracks.json').success(function(data) {
        $scope.tracks = data;

        $scope.next = function (autoplay) {
            var track     = $scope.tracks[Math.floor(Math.random()*($scope.tracks).length)];
            var track_id  = track.id;
            var track_url = "http://api.soundcloud.com/tracks/" + track_id;

            SC.oEmbed(
                track_url,
                {auto_play: autoplay, show_comments: false},
                document.getElementById("player")
            );
        };

        $scope.init = function () {
            SC.initialize({
                client_id: 'YOUR_CLIENT_ID'
            });

            $scope.next(false);
        }

        $scope.init();
    });
};