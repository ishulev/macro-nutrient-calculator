(function() {
	'use strict';
	//All of the oddities in this file are thanks to johnPapa's style guide
	//Documentation: https://github.com/johnpapa/angular-styleguide#directives
	angular
		.module('app')
		.directive('rowDirective', rowDirectiveFunction);

	rowDirectiveFunction.$inject = ['$rootScope'];

	function rowDirectiveFunction($rootScope) {
		var directive = {
			restict: 'EA',
			scope: { 
				food: '=',
				rowIndex: '@'
			},
			templateUrl: 'templates/row-template.html',
			replace: true,
			link: link,
			require: '^contentDirective',
			controller: Controller,
			controllerAs: 'vm'
		};
		return directive;

		function link(scope, element, attrs, contentDirectiveCtrl)
		{
			// element.on('click', function(){
			// 	console.log(contentDirectiveCtrl);
			// });
			var currentNutrients = {};
			currentNutrients.quantity = scope.vm.quantity;
			currentNutrients.combinedNutrients = combineNutrients(scope.food.nutrients);
			// contentDirectiveCtrl.quantity = scope.vm.quantity;
			var currentPosition = contentDirectiveCtrl.nutrients.push(currentNutrients);
			scope.vm.linkFunction = function(){
				contentDirectiveCtrl.nutrients[currentPosition-1].quantity = parseInt(scope.vm.quantity);
				$rootScope.$broadcast('changeQuantity', scope.vm.quantity);
			}
			// var combinedNutrients = combineNutrients(scope.food.nutrients);
		};

		function combineNutrients(nutrients){
			var combinedNutrients = {};
			combinedNutrients.proximates = [];
			for(var i=0; i<nutrients.length; i++){
				if(nutrients[i].group == 'Proximates')
				{
					var value = nutrients[i].value;
					var unit = nutrients[i].unit;
					var nutrient = {};
					nutrient.nutrient = nutrients[i].name;
					nutrient.unit = unit;
					nutrient.value = value;
					combinedNutrients.proximates.push(nutrient);
				}
			}
			return combinedNutrients;
		}
	}

	Controller.$inject = ['$scope'];

	function Controller($scope) {
		var vm = this;
		//The quantity needs to be specified in the controller function
		//in order for the radio buttons to update it properly
		//it did not work in the link function
		//requires further investigation
		vm.quantity = 100;

		//This is used by the row removal directive
		//When the scope is encapsulated, the child directive 
		//has access only to these values via require
		vm.index = $scope.rowIndex;
	}
})();