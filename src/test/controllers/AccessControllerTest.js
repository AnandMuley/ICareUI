describe('ACCESS CONTROLLER TEST SUITE:',function(){

	var $scope,loginService,$location;
	
	beforeEach(module('ICareUI'));
	beforeEach(inject(function($injector,$controller,LoginService){
		$scope = $injector.get('$rootScope');
		loginService = LoginService;
		$location = $injector.get('$location');
		createController = function(){
			return $controller('LoginController',{
				'$scope':$scope,
				'LoginService' : LoginService,
				'$location' : $location
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
		$scope.username = 'a';
		$scope.password = 'a';
		
		// WHEN
		$scope.authenticate();
		
		// THEN
		expect($location.path()).toBe('/home');
		
	});
	
	it('Should not authenticate login',function(){
		// GIVEN
		$scope.username = 'a';
		$scope.password = 'b';
		
		// WHEN
		$scope.authenticate();
		
		// THEN
		expect($location.path()).toBe('');
	});
	
});