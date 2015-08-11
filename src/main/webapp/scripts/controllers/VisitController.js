controllers.controller('VisitController',
		['$scope','MedicineService','VisitService','$location',
		 function($scope,medicineService,visitService,$location){
	$scope.pageTitle = 'Create Visit';
	$scope.prescriptions = [];
	
	if($location.search().PID == undefined){
		$location.path('/home');
	}else{
		$scope.pid = $location.search().PID;
	}
	
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
		visitService.createVisit($scope);
	}
	
}]);