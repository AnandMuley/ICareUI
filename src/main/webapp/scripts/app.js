var app = angular.module('ICareUI',[
    'ngRoute',
    'ICareUIControllers',
    'ICareUIServices']);

app.config(['$routeProvider',function($routeProvider){
	$routeProvider.
		when('/',{
			templateUrl : 'views/Login.html',
			controller : 'LoginController'
		}).
		when('/home',{
			templateUrl : 'views/Home.html',
			controller : 'HomeController'
		}).
		when('/patient/create',{
			templateUrl : 'views/CreatePatient.html',
			controller : 'PatientController'
		}).
		when('/patient/search',{
			templateUrl : 'views/SearchPatient.html',
			controller : 'PatientController'
		}).when('/visit/create',{
			templateUrl:'views/CreateVisit.html',
			controller : 'VisitController'
		});
}]);

app.controller('NavCtrl',['$scope','$location',function($scope,$location){
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

var controllers = angular.module('ICareUIControllers',[]);
var services = angular.module('ICareUIServices',[]);