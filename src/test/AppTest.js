describe('APP TEST SUITE:',function(){
	
	var route,navCtrl,$scope;
	
	beforeEach(module('ICareUI'));
	beforeEach(inject(function($injector,$route,$controller){
		route = $route;
		$scope = {};
		createNavController = function(){
			$controller('NavCtrl',{
				'$scope':$scope
			});
		}
		createNavController();
	}));
	
	it('Should validate app configs',function(){
		// Check for controller configs
		expect(app.name).toBe('ICareUI');
		
	});
	
	it('Controllers and Service modules should be defined',function(){
		// Modules to be defined
		expect(controllers).toBeDefined();
		expect(services).toBeDefined();
	});
	
	it('Should validate route configs',function(){
		// GIVEN
		// Config is loaded
		
		// THEN
		
		expect(route.routes['/'].controller).toBe('LoginController');
		expect(route.routes['/home'].controller).toBe('HomeController');
		// Check for template configs
		expect(route.routes['/'].templateUrl).toBe('views/Login.html');
		expect(route.routes['/home'].templateUrl).toBe('views/Home.html');
	});
	
	it('Should validate app dependencies',function(){
		// Check for dependencies
		expect(app.requires.length).toBe(3);
		expect(app.requires.indexOf('ngRoute')).not.toBe(-1);
		expect(app.requires.indexOf('ICareUIControllers')).not.toBe(-1);
		expect(app.requires.indexOf('ICareUIServices')).not.toBe(-1);
	});
	
	it('Should validate default navigable menus',function(){
		expect($scope.menus.length).toBe(2);
		
		expect($scope.menus[0].title).toBe('Login');
		expect($scope.menus[0].href).toBe('#/login');
		
		expect($scope.menus[1].title).toBe('About');
		expect($scope.menus[1].href).toBe('#/about');
		
	});
	
	it('Default selected tab should be login',function(){
		expect($scope.selectedTab).toBe('Login');
	});
	
	it('Should change the selectedTab with provide one',function(){
		// GIVEN
		var selectedNewTab = 'About';
		
		// WHEN
		$scope.selectTab(selectedNewTab);
		
		// THEN
		expect($scope.selectedTab).toBe(selectedNewTab);
	});
	
});