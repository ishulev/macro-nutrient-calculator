'use strict';

describe('app.rowRemovalDirective', function() {
	beforeEach(module('app'));
	describe('view1 controller', function(){
	it('should increment value on click of button', function () {
		scope.value=10;
		var button = directiveElem.find('button');
		button.triggerHandler('click');
		scope.$digest();
		expect(scope.value).toEqual(11);
	});
	});
});