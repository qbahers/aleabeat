angular
    .module('xplore-app')
    .factory('Track', Track);

  Track.$inject = ['$resource'];

  function Track ($resource) {
    return $resource('/api/tracks/:id');
  }