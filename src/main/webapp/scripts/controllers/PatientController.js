controllers.controller('PatientController',['$scope','$location','PatientService',function($scope,$location,patientService){
	$scope.pageTitle = 'Create Patient';
	$scope.editingPatient = false;
	
	if($location.search().PTE!=undefined){
		var patient = $location.search().PTE;
		$scope.pageTitle = patient.pageTitle;
		$scope.editingPatient = patient.editingPatient;
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
	}
	
	$scope.editPatient = function(patientToEdit){
		patientToEdit.editingPatient = true;
		patientToEdit.pageTitle = 'Edit Patient';
		$location.search('PTE',patientToEdit);
		$location.path('/patient/create');
	}
	
	$scope.createVisit = function(patient){
		$location.search('PID',patient.id);
		$location.path('/visit/create');
	}
	
}]);