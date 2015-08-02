controllers.controller('VisitController',['$scope','MedicineService',function($scope,medicineService){
	$scope.pageTitle = 'Create Visit';
	$scope.prescriptions = [];
	
	$scope.searchMedicine = function(){
		medicineService.findByName($scope.medSrchTxt,$scope);
	}
	
	$scope.prescribe = function(medicine){
		$scope.prescriptions.push(medicine);
		console.log('Prescribing...:'+medicine.name);
	}
	
}]);