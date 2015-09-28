(function() {
	'use strict';
	//All of the oddities in this file are thanks to johnPapa's style guide
	//Documentation: https://github.com/johnpapa/angular-styleguide#directives
	angular
		.module('app')
		.directive('rowRemoval', rowRemovalFunction);

	rowRemovalFunction.$inject = ['$rootScope'];

	function rowRemovalFunction($rootScope) {
		var directive = {
			link: link,
			require: ['^rowDirective', '^contentDirective']
		};
		return directive;

		function link(scope, element, attrs, controllers){
			element.on('click', function(){
				console.log(controllers[1]);
				var index = controllers[0].index;
				if(controllers[1].foods.length === 1)
					$rootScope.searched = false;
				controllers[1].nutrients.splice(index, 1);
				controllers[1].foods.splice(index, 1);
				$rootScope.$broadcast('changeQuantity');
				scope.$apply();
			})
		}
	}
})();