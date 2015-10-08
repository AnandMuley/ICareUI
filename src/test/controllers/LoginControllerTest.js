describe('ACCESS CONTROLLER TEST SUITE:',function(){

	var $scope,loginService,$location,$httpBackend,$rootScope;
	
	beforeEach(module('ICareUI'));
	
	beforeEach(inject(function($injector,$controller,LoginService){
		$scope = $injector.get('$rootScope');
		$rootScope = {};
		loginService = LoginService;
		$location = $injector.get('$location');
		$httpBackend = $injector.get('$httpBackend');
		createController = function(){
			return $controller('LoginController',{
				'$scope':$scope,
				'LoginService' : LoginService,
				'$location' : $location,
				'$rootScope':$rootScope
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
		var data = {
				authcode : 'ad2rdd24sdsa24reea'
		}
		$scope.user = {
			username : 'abc',
			password : 'Abc@123'
		};
		
		$httpBackend.when('GET','/ICareRest/rest/user/authenticate?uname='+$scope.user.username+'&pwd='+$scope.user.password).respond(200,data);
		// WHEN
		$scope.login();
		$httpBackend.flush();
		
		// THEN
		expect($scope.user.authenticated.authcode).toBe(data.authcode);
		
	});
	
	it('Should not authenticate login',function(){
		// GIVEN
		var data = {
				authcode : 'ad2rdd24sdsa24reea'
		}
		$scope.user = {
			username : 'abc',
			password : 'Abc@123'
		};
		
		$httpBackend.when('GET','/ICareRest/rest/user/authenticate?uname='+$scope.user.username+'&pwd='+$scope.user.password).respond(400,data);
		// WHEN
		$scope.login();
		$httpBackend.flush();
		
		// THEN
		expect($scope.user.message).toBe('Something went wrong!');
	});
	
});