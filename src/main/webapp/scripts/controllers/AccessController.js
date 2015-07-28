controllers.controller('LoginController',
		['$scope','LoginService','$location',function($scope,loginService,$location){
	$scope.pageTitle = 'Login Page';
	$scope.authenticate = function(){
		if(loginService.authenticate($scope.username,$scope.password)){
			$location.path('/home');
		}
	}
}]);