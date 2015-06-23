var iCareUIApp = angular.module('ICareUI',[
    'ngRoute',
    'iCareUIControllers']);

iCareUIApp.config(['$routeProvider',function($routeProvider){
	$routeProvider.
		when('/login',{
			templateUrl : 'views/Login.html',
			controller : 'LoginController'
		}).
		when('/index',{
			templateUrl : 'views/Index.html',
			controller : 'IndexController'
		}).
		otherwise('/index');
}]);

iCareUIApp.controller('NavCtrl',['$scope','$location',function($scope,$location){
	$scope.menus = [
	    {
	    	'title' : 'Login',
	    	'href' : '#/login'
	    },
	    {
	    	'title' : 'About',
	    	'href' : '#/about'
	    }
	 ];
	$scope.selectedTab = 'Login';
	$scope.selectTab= function(selectedTab){
		$scope.selectedTab = selectedTab;
	}
	
}]);