
var govermentApp = angular.module('govermentApp', [
    'ngRoute',
    'ui.bootstrap',
    'governmentControllers',
    'governmentServices',
    'duScroll',
    'djds4rce.angular-socialshare'
]);


function CarouselDemoCtrl($scope) {
  $scope.myInterval = 5000;
}

govermentApp.run(function($FB){
  $FB.init('295516920620310');
});

govermentApp.config(function($routeProvider, $locationProvider) {
    $routeProvider. 
      when('/items', {
        templateUrl: 'pages/items-list.html',
        controller: 'ItemListCtrl'
      }).
      when('/items/item/:id', {
        templateUrl: 'pages/item-details.html',
        controller: 'ItemDetailCtrl'
      }).
      when('/survey', {
        templateUrl: 'pages/survey.html',
        controller: 'SurveyCtrl'
      }).
      when('/thank-you', {
        templateUrl: 'pages/thank-you.html',
        controller: 'ThankYouCtrl'
      }).
      otherwise({
        redirectTo: '/items'
      });

    // use the HTML5 History API
    // $locationProvider.html5Mode(true).hashPrefix('!');
    $locationProvider.html5Mode(true);
});

