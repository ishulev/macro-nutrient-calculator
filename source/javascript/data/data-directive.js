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

	Controller.$inject = ['$scope', '$rootScope', 'dataFactory'];

	function Controller($scope, $rootScope, dataFactory) {
		var vm = this;
		vm.nutrients = [];

		vm.foods = [];

		function getAllData(){
			return dataFactory
				.getData()
				.then(function(data) {
					console.log(data);
					vm.foods.push(data);
					$rootScope.searched = true;
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
			var duplicate = false;
			for(var i = 0; i<vm.foods.length; i++){
				if(vm.foods[i].report && vm.foods[i].report.food.ndbno == data)
					duplicate = true;
			}
			if(!duplicate)
				addFood(data);
		});
		// $scope.$on('removeFood', function(event, data) {
		// 	vm.foods.splice(data, 1);
		// 	//Needed for the removal of the item from the table
		// 	$scope.$apply();
		// });
	}
})();