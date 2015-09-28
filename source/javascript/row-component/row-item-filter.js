(function() {
	'use strict';
	//All of the oddities in this file are thanks to johnPapa's style guide
	//Documentation: https://github.com/johnpapa/angular-styleguide
	angular
		.module('app')
		.filter('rowItemFilter', rowItemFilterFunction);

	function rowItemFilterFunction() {
		var macroNutrients = ['Protein', 'Total lipid (fat)', 'Carbohydrate, by difference'];
		return function(dataArray) {
			return dataArray.filter(function(signularData) {
				if (macroNutrients.indexOf(signularData.name) != -1) {
					return true;
				}
				return false;
			});
		};
	}
})();