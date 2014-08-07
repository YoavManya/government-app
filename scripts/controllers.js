'use strict';

/* Controllers */

var governmentControllers = angular.module('governmentControllers', []);

governmentControllers.controller('ItemListCtrl',  ['$scope', 'Item', 
	function($scope, Item) {
	    $scope.items = Item.query();
	}]);

governmentControllers.controller('ItemDetailCtrl', ['$scope', '$routeParams', 'Item',
	  function($scope, $routeParams, Item) {

	    $scope.items = Item.query();
	    $scope.item = Item.query({id: $routeParams.id}, function(item) {
	        $scope.item = item[0];
	        $scope.code = item[0].youtubeUrl;
	    });
	}]);

governmentControllers.controller("SurveyCtrl", ['$scope', '$location', '$http', '$document', 
	function($scope, $location, $http, $document) {
		$scope.survey = {
			questionOne: "",
			questionTwo: "",
			questionThree: "",
			questionFour: "",
			questionFive: ""
		};

		setTimeout(function(){
			var radioButtons = document.getElementsByClassName("css-checkbox");
			for (var i = 0 ; i < radioButtons.length ; i++) {
				if(radioButtons[i].checked) {
					radioButtons[i].checked = false; 
				}
			}
		}, 100);

	    var survey = angular.element(document.getElementById('survey'));
	    $document.scrollTo(survey, 0, 500);

		$scope.submitSurvey = function() {
			//Submit data to server

			var radioButtons = document.getElementsByClassName("css-checkbox");
			var radioButtonsOn = 0;

			for (var i = 0 ; i < radioButtons.length ; i++) {
				if(radioButtons[i].checked) {
					radioButtonsOn++;	
				}
			}

			if(radioButtonsOn < 5) {
				alert("Por favor conteste todas las preguntas")
			} else {
				$http({
					url: 'php/formHandler.php',
					method: 'POST',
					data: this.survey
				}).then(function(response) {
					console.log(response);
					$location.path('/thank-you').replace();
				});	
			}
		}
	}]);

governmentControllers.controller("ThankYouCtrl", ['$scope', '$location',  function($scope, $location) {
	    
	}]);

governmentControllers.directive('myYoutube', function($sce) {
  return {
    restrict: 'EA',
    scope: { code:'=' },
    replace: true,
    template: '<div><iframe style="overflow:hidden;height:480px;width:853px" width="853" height="480" src="{{url}}" frameborder="0" allowfullscreen></iframe></div>',
    link: function (scope) {
        scope.$watch('code', function (newVal) {
           if (newVal) {
               scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + newVal);
           }
        });
    }
  };
});