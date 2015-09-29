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
		var previousSearchQuery;
		
		vm.results = {};

		function getAllData(){
			return dataSearchFactory
				.getData()
				.then(function(data) {
					if(data.status == 0)
						vm.badSearch = true;
					else
					{
						vm.badSearch = false;
						vm.results = data;
					}
					vm.searching = false;
				})
				.catch(function(error) {
					console.log(error);
				});
		}

		vm.addItem = function(ndbno){
			$rootScope.$broadcast('addFoodToTable', ndbno);
		}

		vm.sendQuery = function()
		{
			if(vm.searchQuery === previousSearchQuery)
				return;
			previousSearchQuery = vm.searchQuery;
			vm.searching = true;
			dataSearchFactory.setFoodQuery(vm.searchQuery);
			getAllData();
		}
	}
})();