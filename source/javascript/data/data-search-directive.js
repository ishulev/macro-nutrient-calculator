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

	Controller.$inject = ['$rootScope', 'dataSearchFactory'];

	function Controller($rootScope, dataSearchFactory) {
		var vm = this;
		
		vm.results = {};

		function getAllData(){
			return dataSearchFactory
				.getData()
				.then(function(data) {
					vm.results = data;
				})
				.catch(function(error) {
					console.log(error);
				});
		}

		vm.addItem = function(ndbno){
			console.log(ndbno);
			$rootScope.$broadcast('addFoodToTable', ndbno);
		}

		vm.sendQuery = function()
		{
			dataSearchFactory.setFoodQuery(vm.searchQuery);
			getAllData();
		}

		// getAllData();
	}
})();