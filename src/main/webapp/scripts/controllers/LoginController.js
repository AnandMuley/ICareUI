controllers.controller('LoginController',
		['$scope','LoginService','$location','$rootScope','$cookies',
		 	function($scope,loginService,$location,$rootScope,$cookies){
	$scope.pageTitle = 'Login Page';
	$rootScope.authenticated = false;
	
	$scope.login = function(){
		loginService.authenticate($scope.user,$location,$rootScope);
	}
	
}]);