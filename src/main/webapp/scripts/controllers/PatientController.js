controllers.controller('PatientController',['$scope','$location','PatientService',function($scope,$location,patientService){
	$scope.pageTitle = 'Create Patient';
	
	$scope.create = function(){
		patientService.save($scope);
	}
	
	$scope.search = function(){
		patientService.searchByName($scope);
	}
	
	$scope.editPatient = function(patientToEdit){
		$location.path()
	}
	
}]);