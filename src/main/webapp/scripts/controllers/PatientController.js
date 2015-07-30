controllers.controller('PatientController',['$scope','$location','PatientService',function($scope,$location,patientService){
	$scope.pageTitle = 'Create Patient';
	$scope.editingPatient = false;
	
	$scope.create = function(){
		patientService.save($scope);
	}
	
	$scope.search = function(){
		patientService.searchByName($scope);
	}
	
	$scope.editPatient = function(patientToEdit){
		$location.path('/patient/edit');
		patientService.populateReqModelsForEditing(patientToEdit,$scope);
		$scope.editingPatient = true;
		$scope.pageTitle = 'Edit Patient';
	}
	
}]);