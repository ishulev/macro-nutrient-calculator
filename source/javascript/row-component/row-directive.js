(function() {
	'use strict';
	//All of the oddities in this file are thanks to johnPapa's style guide
	//Documentation: https://github.com/johnpapa/angular-styleguide#directives
	angular
		.module('app')
		.directive('rowDirective', rowDirectiveFunction);


	function rowDirectiveFunction() {
		var directive = {
			restict: 'EA',
			scope: { 
				food: '='
			},
			templateUrl: 'templates/row-template.html',
			replace: true,
			link: link
		};
		return directive;

		function link(scope, element, attrs, contentDirectiveCtrl)
		{
			scope.quantity = 100;
		};
	}
})();