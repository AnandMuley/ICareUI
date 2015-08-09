controllers.controller('VisitController',['$scope','MedicineService','VisitService',function($scope,medicineService,visitService){
	$scope.pageTitle = 'Create Visit';
	$scope.prescriptions = [];
	
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
	
}]);