var app = angular.module('ICareUI',[
    'ngRoute',
    'ICareUIControllers',
    'ICareUIServices',
    'ngCookies']);

app.config(['$routeProvider',function($routeProvider){
	$routeProvider.
		when('/login',{
			templateUrl : 'views/Login.html',
			controller : 'LoginController'
		}).when('/home',{
			templateUrl : 'views/Home.html',
			controller : 'HomeController'
		}).when('/patient/create',{
			templateUrl : 'views/CreatePatient.html',
			controller : 'PatientController'
		}).when('/patient/edit',{
			templateUrl : 'views/CreatePatient.html',
			controller : 'PatientController'
		}).when('/patient/search',{
			templateUrl : 'views/SearchPatient.html',
			controller : 'PatientController'
		}).when('/visit/create',{
			templateUrl:'views/CreateVisit.html',
			controller : 'VisitController'
		}).when('/appointment/create',{
			templateUrl : 'views/CreateAppointment.html',
			controller : 'AppointmentController'
		}).when('/appointment/queue',{
			templateUrl : 'views/ViewAppointments.html',
			controller : 'AppointmentController'
		}).when('/logout',{
			templateUrl : 'views/Login.html',
			controller : 'LoginController'
		});
}]);

var controllers = angular.module('ICareUIControllers',[]);
var services = angular.module('ICareUIServices',[]);