var iCareUIApp = angular.module('ICareUI',[
    'ngRoute',
    'iCareUIControllers']);

iCareUIApp.config(['$routeProvider',function($routeProvider){
	$routeProvider.
		when('/login',{
			templateUrl : 'views/Login.html',
			controller : 'LoginController'
		}).
		otherwise('/index',{
			templateUrl : 'views/Index.html',
			controller : 'IndexController'
		});
}]);

iCareUIApp.controller('NavCtrl',['$scope','$location',function($scope,$location){
	$scope.menus = ['Login','About'];
	$scope.selectTab= function(selectedTab){
		$scope.selectedTab = selectedTab;
		switch(selectedTab){
			case $scope.menus[0]:
				$location.path('/login');
				break;
			case $scope.menus[1]:
				$location.path('/about');
				break;
			default:
				$location.path('/index');
				break;
		}
	}
	
}]);