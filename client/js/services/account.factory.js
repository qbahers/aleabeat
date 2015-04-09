'use strict';

angular
    .module('aleabeat-app')
    .factory('Account', Account);

Account.$inject = ['$resource'];

function Account ($resource) {
    return $resource('/account');
}