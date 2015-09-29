(function() {
	'use strict';
	//All of the oddities in this file are thanks to johnPapa's style guide
	//Documentation: https://github.com/johnpapa/angular-styleguide
	angular
		.module('app')
		.filter('rowDataFilter', rowDataFilterFunction);

	function rowDataFilterFunction() {
		return function(input) {
			if(input > 1000)
			{
				input = input/1000;
				input = input.toFixed(2);
				input = input.toString().split('.');
				if(input[1] == "00")
					return parseInt(input[0]) + 'kg';
				else
					return parseFloat(input[0] + '.' + input[1]) + 'kg';
			}
			else
				return input + 'g';
		};
	}
})();