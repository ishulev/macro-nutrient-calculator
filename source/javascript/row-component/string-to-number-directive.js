(function() {
	'use strict';
	//All of the oddities in this file are thanks to johnPapa's style guide
	//Documentation: https://github.com/johnpapa/angular-styleguide#directives
	angular
		.module('app')
		.directive('stringToNumber', stringToNumberFunction);

	function stringToNumberFunction(){
		var directive = {
			require: 'ngModel',
			link: link
		};

		//Code was taken from https://docs.angularjs.org/error/ngModel/numfmt?p0=100
		function link(scope, element, attrs, ngModel){
			ngModel.$parsers.push(function(value) {
				return '' + value;
			});
			ngModel.$formatters.push(function(value) {
				return parseFloat(value, 10);
			});
		};

		return directive;
	};
})();