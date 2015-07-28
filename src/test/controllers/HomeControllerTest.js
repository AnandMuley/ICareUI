describe('HOME CONTROLLER TEST SUITE:',function(){
	
	var $scope;
	
	beforeEach(module('ICareUI'));
	
	beforeEach(inject(function($injector,$controller){
		$scope = {};
		createController = function(){
			return $controller('HomeController',{
				'$scope':$scope
			});
		}
		createController();
		
	}));
	
	it('Should test for page title',function(){
		// THEN
		expect($scope.pageTitle).toBe('Home Page');
	});
	
});