(function() {
	'use strict';
	//All of the oddities in this file are thanks to johnPapa's style guide
	//Documentation: https://github.com/johnpapa/angular-styleguide#directives
	angular
		.module('app')
		.directive('resultDirective', resultDirectiveFunction);


	function resultDirectiveFunction() {
		var directive = {
			restict: 'EA',
			scope: true,
			require: '^contentDirective',
			templateUrl: 'templates/result-template.html',
			replace: true,
			link: link
		};
		return directive;

		function link(scope, element, attrs, contentDirectiveCtrl){
			console.log(contentDirectiveCtrl);
		};
	}
})();