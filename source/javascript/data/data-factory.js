(function() {
	'use strict';
	//All of the oddities in this file are thanks to johnPapa's style guide
	//Documentation: https://github.com/johnpapa/angular-styleguide#factories
	angular
		.module('app')
		.factory('dataFactory', dataFactoryFunction);
	dataFactoryFunction.$inject = ['$http'];

	function dataFactoryFunction($http){
		var service = {
			getData: getData,
			getFoodId: getFoodId,
			foodId : ''
		};

		return service;

		function getFoodId(newFoodId) {
			this.foodId = newFoodId;
		}

		function getData() {
			return $http
				.get('http://api.nal.usda.gov/ndb/reports/', {
					params: {
						ndbno: this.foodId,
						api_key: 'bnG797tzWDkhzvRU81SN1PXFht1I2U1VtksogLun'
					}
				})
				.then(getDataComplete)
				.catch(getDataFailed);

			function getDataComplete(response) {
				return response.data;
			}

			function getDataFailed(error) {
				console.log(error);
				return error;
			}
		}
	}
})();