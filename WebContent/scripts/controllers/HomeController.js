controllers.controller('HomeController',['$scope','PatientService',function($scope,patientService){
	$scope.pageTitle = 'Home Page';
	
	$scope.createPatient = function(){
		patientService.save($scope);
	}
	
	
}]);