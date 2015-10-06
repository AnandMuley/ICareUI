describe('LOGIN SERVICE TEST SUITE:',function(){
	
	var loginService,$cookies;
	beforeEach(module('ICareUI'));

	beforeEach(inject(function($injector,LoginService) {
		loginService = LoginService;
		$cookies = $injector.get('$cookies');
	}));

	it('Should generate an auth cookie',function(){
		// GIVEN
		var authCode = 'acg1-dsg3-352f-25sf';
		
		// WHEN
		loginService.generateAuthCookie(authCode);
		
		// THEN
		expect($cookies.auth).toBe(authCode);
	});
	
});