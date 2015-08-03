app.service('MedicineService', [ '$http', function($http) {

	var context = 'http://localhost:8090/ICareRest/rest/';
	
	this.findByName = function(searchTxt,scope){
		$http({
			method : 'GET',
			url : context + 'medicine/searchbyname?name='+searchTxt
		}).success(function(data,status){
			scope.medicines = data;
		}).error(function(data,status){
			scope.message = 'No medicines found';
			scope.medicines = [];
		});
	}
	
}]);