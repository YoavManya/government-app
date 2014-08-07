'use strict';

/* Services */

var governmentServices = angular.module('governmentServices', ['ngResource']);

governmentServices.factory('Item', ['$resource',
  function($resource){
    return $resource('items/:id.json', {}, {
      query: {method:'GET', params:{id:'itemsList'}, isArray:true}
    });
  }]);
