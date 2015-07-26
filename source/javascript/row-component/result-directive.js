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

		function calculateNutrition(nutrients){
			var combinedNutrients = {};
			for(var i=0; i<nutrients.length; i++){
				var currentNutrientSet = nutrients[i];
				var quantity = currentNutrientSet.quantity;
				var proximates = currentNutrientSet.combinedNutrients.proximates;
				for(var j=0; j<proximates.length; j++)
				{
					var value = parseInt(proximates[j].value);
					var realValue = (value*quantity)/100;
					var nutrientName = proximates[j].nutrient;
					var nutrition = {};
					nutrition.value = realValue;
					nutrition.unit = proximates[j].unit;
					// console.log(proximates[j]);
					if(i>0)
					{
						combinedNutrients[nutrientName].value += realValue;
					}
					else
					{
						combinedNutrients[nutrientName] = nutrition;
					}
					// combinedNutrients[proximates[j].name].value += proximates[j].value;
				}
			}
			return combinedNutrients;
		};

		function link(scope, element, attrs, contentDirectiveCtrl){
			scope.$on('changeQuantity', function(){
				// console.log(data);
				scope.combinedNutrition = calculateNutrition(contentDirectiveCtrl.nutrients);
				// console.log(contentDirectiveCtrl.nutrients);
			})
		};
	}
})();