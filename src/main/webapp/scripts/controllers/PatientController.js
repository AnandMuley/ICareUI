controllers.controller('PatientController',
		['$scope','$location','PatientService',
		 function($scope,$location,patientService){
	$scope.pageTitle = 'Create Patient';
	$scope.isEditing = false;
	
	if(patientService.getPatient().isEditing){
		var patient = patientService.getPatient();
		$scope.pageTitle = 'Edit Patient';
		$scope.isEditing = patient.isEditing;
		patientService.populateReqModelsForEditing(patient,$scope);
	}

	$scope.create = function(){
		patientService.save($scope);
	}
	
	$scope.search = function(){
		patientService.searchByName($scope);
	}
	
	$scope.update = function(){
		patientService.update($scope);
		patientService.resetPatient();
		patientService.resetModelsForEditing($scope);
	}
	
	$scope.editPatient = function(patientToEdit){
		patientToEdit.isEditing = true;
		patientService.setCurrentPatient(patientToEdit);
		$location.path('/patient/edit');
	}
	
	$scope.createVisit = function(patient){
		patientService.setCurrentPatient(patient);
		$location.path('/visit/create');
	}
	
}]);