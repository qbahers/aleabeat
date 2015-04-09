'use strict';

angular
    .module('aleabeat-app')
    .factory('User', User);

User.$inject = ['$resource'];

function User ($resource) {
    return $resource('/api/users/:_id',
        { _id: '@_id' },
        { update: { method: 'PUT' } }
    );
}