describe('HOME CONTROLLER TEST SUITE:',function(){
	
	var $scope;
	
	beforeEach(module('ICareUI','ngCookies'));
	
	beforeEach(inject(function($injector,$controller,LoginService){
		$scope = {};
		createController = function(){
			return $controller('HomeController',{
				'$scope':$scope,
				'LoginService':LoginService
			});
		}
		createController();
		
	}));
	
	it('Should test for page title',function(){
		// THEN
		expect($scope.pageTitle).toBe('Home Page');
	});
	
});