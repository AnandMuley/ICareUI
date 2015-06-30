describe('AccessControllerTest',function(){

	var $scope,loginService;
	
	beforeEach(module('ICareUI'));
	beforeEach(inject(function($injector,$controller,LoginService){
		$scope = $injector.get('$rootScope');
		loginService = LoginService;
		createController = function(){
			return $controller('LoginController',{
				'$scope':$scope,
				'LoginService' : LoginService
			});
		};
		
		createController();
	}));
	
	it('Should test for page title',function(){
		// THEN
		expect($scope.pageTitle).toBe('Login Page');
	});
	
	it('Should authenticate login',function(){
		// GIVEN
		
		// WHEN
		$scope.authenticate()
		
		// THEN
		
	});
	
});