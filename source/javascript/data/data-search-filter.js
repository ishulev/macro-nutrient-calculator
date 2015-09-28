(function() {
	'use strict';
	//Awesome code from https://github.com/frapontillo/angular-filters/blob/develop/src/filters/default/default.js
	//with a slight personal modification
	angular
		.module('app')
		.filter('dataSearchFilter', dataSearchFilterFunction);

	function dataSearchFilterFunction() {
		return function(input, value) {
			if (!isNaN(input) && input !== null && input !== undefined && (input !== '' || angular.isNumber(input))) {
				return input;
			}
				return 0;
		};
	}
})();