describe('INDEX CONTROLLER TEST SUITE:',function(){
	
	var indexController,$scope;
	
	// Setup
	beforeEach(module('ICareUI'));
	beforeEach(inject(function($injector,$controller){
		$scope = {};
		
		createController = function(){
			$controller('IndexController',{
				'$scope':$scope
			});
		}
		
		createController();
		
	}));
	
	it('Should test for the page title',function(){
		// GIVEN
		
		// WHEN
		
		// THEN
		expect($scope.pageTitle).toBe('Index Page');
		
	});
	
});