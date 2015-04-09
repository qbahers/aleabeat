'use strict';

angular
    .module('aleabeat-app')
    .factory('Track', Track);

Track.$inject = ['$resource'];

function Track ($resource) {
    return $resource('/api/tracks/:_id', 
        { _id: '@_id' },
        { update: { method: 'PUT' } }
    );
}