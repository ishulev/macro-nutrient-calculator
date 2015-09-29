(function() {
	'use strict';
	//All of the oddities in this file are thanks to johnPapa's style guide
	//Documentation: https://github.com/johnpapa/angular-styleguide#directives
	angular
		.module('app')
		.directive('enterClick', enterClickFunction);

	function enterClickFunction() {
		var directive = {
			link: link
		};
		return directive;

		function link(scope, element, attrs){
			//Pretty code from http://stackoverflow.com/a/17472118
			element.bind("keydown keypress", function (event) {
				if(event.which === 13) {
					scope.$apply(function (){
						scope.$eval(attrs.enterClick);
					});
					event.preventDefault();
				}
			});
		}
	}
})();