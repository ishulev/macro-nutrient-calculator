(function() {
	'use strict';
	//All of the oddities in this file are thanks to johnPapa's style guide
	//Documentation: https://github.com/johnpapa/angular-styleguide
	angular
		.module('app')
		.filter('intToFloatFilter', intToFloatFilterFunction);

	function intToFloatFilterFunction() {
		var decimal = false;
		var stringInput;
		var decimalCount;
		var output;
		return function(input) {
			var stringInput = input.toString();
			//Check if there is a decimal portion of the number
			if(stringInput.indexOf('.') > -1) 
			{
				stringInput = stringInput.split('.');
				decimalCount = stringInput[1].length;
				if(decimalCount > 3)
					output = stringInput[0] + '.' + stringInput[1].substr(0, 3);
				else
					output = stringInput[0] + '.' + stringInput[1].substr(0, parseInt(decimalCount));
				return parseFloat(output);
			}
			return input;
		};
	}
})();