controllers.controller('VisitController',
		['$scope','MedicineService','VisitService','PatientService','$location',
		 function($scope,medicineService,visitService,patientService,$location){
	$scope.pageTitle = 'Create Visit';
	$scope.prescriptions = [];
	$scope.patient = patientService.getPatient();
	visitService.fetchVisits($scope,$scope.patient.id);
	
	$scope.searchMedicine = function(){
		medicineService.findByName($scope.medSrchTxt,$scope);
	}
	
	$scope.prescribe = function(medicine){
		if(medicine.checked){
			visitService.prescribeMedicine(medicine,$scope);
		}else{
			visitService.unprescribeMedicine(medicine,$scope);
		}
	}
	
	$scope.createVisit = function(){
		visitService.createVisit($scope,$scope.patient);
		visitService.clearVisitModels($scope);
		$("#message-container").fadeTo(2000, 500).slideUp(500, function(){
		    $("#message-container").alert('close');
		});
	}
	
}]);