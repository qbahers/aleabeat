angular
    .module('xplore-app')
    .factory('Account', Account);

Account.$inject = ['$resource'];

function Account ($resource) {
    return $resource('/account');
}