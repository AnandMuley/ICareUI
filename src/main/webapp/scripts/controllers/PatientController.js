controllers.controller('PatientController',['$scope','PatientService',function($scope,patientService){
	$scope.pageTitle = 'Create Patient';
	
	$scope.create = function(){
		patientService.save($scope);
	}
	
	$scope.search = function(){
		patientService.searchByName($scope);
	}
	
}]);