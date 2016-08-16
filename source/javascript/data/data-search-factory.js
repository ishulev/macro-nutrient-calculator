(function() {
	'use strict';
	//All of the oddities in this file are thanks to johnPapa's style guide
	//Documentation: https://github.com/johnpapa/angular-styleguide#factories
	angular
		.module('app')
		.factory('dataSearchFactory', dataSearchFactoryFunction);
	dataSearchFactoryFunction.$inject = ['$http'];

	function dataSearchFactoryFunction($http){
		var service = {
			getData: getData,
			setFoodQuery: setFoodQuery,
			foodQuery : ''
		};

		return service;

		function setFoodQuery(newfoodQuery) {
			this.foodQuery = newfoodQuery;
		}

		function getData() {
			return $http
				.get('http://api.nal.usda.gov/ndb/search/', {
					params: {
						q: this.foodQuery,
						format: 'json',
						api_key: 'bnG797tzWDkhzvRU81SN1PXFht1I2U1VtksogLun'
					}
				})
				.then(getDataComplete)
				.catch(getDataFailed);

			function getDataComplete(response) {
				return response.data;
			}

			function getDataFailed(error) {
				// console.log(error);
				return error;
			}
		}
	}
})();