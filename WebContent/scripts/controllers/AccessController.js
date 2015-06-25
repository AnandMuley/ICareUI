controllers.controller('LoginController',
		['$scope','LoginService','$location',function($scope,LoginService,$location){
	$scope.pageTitle = 'Login Page';
	$scope.authenticate = function(){
		if(LoginService.authenticate($scope.username,$scope.password)){
			$location.path('/home');
		}
	}
}]);