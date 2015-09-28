(function() {
	'use strict';
	//All of the oddities in this file are thanks to johnPapa's style guide
	//Documentation: https://github.com/johnpapa/angular-styleguide#directives
	angular
		.module('app')
		.directive('resultDirective', resultDirectiveFunction);

	resultDirectiveFunction.$inject = ['$rootScope', '$filter'];
	function resultDirectiveFunction($rootScope, $filter) {
		var directive = {
			restict: 'EA',
			scope: true,
			require: '^contentDirective',
			templateUrl: 'templates/result-template.html',
			replace: true,
			link: link
		};
		return directive;

		function calculatePercentage(combinedNutrients)
		{
			var proteinCalories = combinedNutrients['Protein'].value*4;
			var carbCalories = combinedNutrients['Carbohydrate, by difference'].value*4;
			var fatCalories = combinedNutrients['Total lipid (fat)'].value*9;
			var calories = proteinCalories + carbCalories + fatCalories;

			var proteinPercentage = (proteinCalories/calories)*100;
			var carbPercentage = (carbCalories/calories)*100;
			var fatPercentage = (fatCalories/calories)*100;

			combinedNutrients['Protein'].percentage = proteinPercentage;
			combinedNutrients['Carbohydrate, by difference'].percentage = carbPercentage;
			combinedNutrients['Total lipid (fat)'].percentage = fatPercentage;
			
			return combinedNutrients;
		}

		function calculateNutrition(nutrients){
			var combinedNutrients = {};
			for(var i=0; i<nutrients.length; i++){
				var currentNutrientSet = nutrients[i];
				var quantity = $filter('dataSearchFilter')(currentNutrientSet.quantity);
				var proximates = currentNutrientSet.combinedNutrients.proximates;
				for(var j=0; j<proximates.length; j++)
				{
					if(proximates[j].nutrient == 'Protein' || proximates[j].nutrient == 'Carbohydrate, by difference' || proximates[j].nutrient == 'Total lipid (fat)')
					{
						var value = parseInt(proximates[j].value);
						var realValue = (value*quantity)/100;
						var nutrientName = proximates[j].nutrient;
						var nutrition = {};
						nutrition.value = realValue;
						nutrition.unit = proximates[j].unit;
						if(i>0)
						{
							if(combinedNutrients[nutrientName])
								combinedNutrients[nutrientName].value += realValue;
						}
						else
						{
							combinedNutrients[nutrientName] = nutrition;
						}
					}
					// combinedNutrients[proximates[j].name].value += proximates[j].value;
				}
			}
			combinedNutrients = calculatePercentage(combinedNutrients);
			return combinedNutrients;
		};

		function link(scope, element, attrs, contentDirectiveCtrl){
			scope.$on('changeQuantity', function(){
				if($rootScope.searched)
					scope.combinedNutrition = calculateNutrition(contentDirectiveCtrl.nutrients);
			})
		};
	}
})();