controllers.controller('LoginController',
		['$scope','LoginService','$location','$rootScope',
		 	function($scope,loginService,$location,$rootScope){
	$scope.pageTitle = 'Login Page';
	$scope.login = function(){
		loginService.authenticate($scope.user);
		if($scope.user.authenticated){
			$location.path('/home');
			$rootScope.authenticated=true;
		}else{
			$scope.user.message = 'Authentication failed !';
		}
	}
}]);