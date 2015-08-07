(function() {
	'use strict';
	//All of the oddities in this file are thanks to johnPapa's style guide
	//Documentation: https://github.com/johnpapa/angular-styleguide#directives
	angular
		.module('app')
		.directive('contentDirective', contentDirectiveFunction);


	function contentDirectiveFunction() {
		var directive = {
			restict: 'EA',
			controller: Controller,
			controllerAs: 'vm',
			scope: true,
			templateUrl: 'templates/data-template.html'
		};
		return directive;
	}

	Controller.$inject = ['$scope', 'dataFactory'];

	function Controller($scope, dataFactory) {
		var vm = this;
		vm.nutrients = [];

		vm.foods = [];

		function getAllData(){
			return dataFactory
				.getData()
				.then(function(data) {
					vm.foods.push(data);
					// console.log(data);
				})
				.catch(function(error) {
					console.log(error);
				});
		}

		function addFood(food_id)
		{
			dataFactory.getFoodId(food_id);
			getAllData();
		}

		$scope.$on('addFoodToTable', function(event, data) {
			addFood(data);
		});
		// $scope.$on('removeFood', function(event, data) {
		// 	vm.foods.splice(data, 1);
		// 	//Needed for the removal of the item from the table
		// 	$scope.$apply();
		// });
	}
})();