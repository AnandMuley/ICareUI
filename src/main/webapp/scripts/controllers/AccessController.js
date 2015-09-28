controllers.controller('LoginController',
		['$scope','LoginService','$location','$rootScope',
		 	function($scope,loginService,$location,$rootScope){
	$scope.pageTitle = 'Login Page';
	$scope.login = function(){
		loginService.authenticate($scope.user,$location,$rootScope);
	}
}]);