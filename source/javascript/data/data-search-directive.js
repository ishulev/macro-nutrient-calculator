(function() {
	'use strict';
	//All of the oddities in this file are thanks to johnPapa's style guide
	//Documentation: https://github.com/johnpapa/angular-styleguide#directives
	angular
		.module('app')
		.directive('contentSearchDirective', contentSearchDirectiveFunction);


	function contentSearchDirectiveFunction() {
		var directive = {
			restict: 'EA',
			controller: Controller,
			controllerAs: 'vm',
			scope: true,
			templateUrl: 'templates/data-search-template.html'
		};
		return directive;
	}

	Controller.$inject = ['dataSearchFactory'];

	function Controller(dataSearchFactory) {
		var vm = this;
		
		vm.foods = [];
		dataSearchFactory.getFoodId(food_id);

		function getAllData(){
			return dataSearchFactory
				.getData()
				.then(function(data) {
					vm.foods.push(data);
				})
				.catch(function(error) {
					console.log(error);
				});
		}

		vm.addFood = function(food_id)
		{
			dataSearchFactory.getFoodId(food_id);
			getAllData();
		}

		// getAllData();
	}
})();