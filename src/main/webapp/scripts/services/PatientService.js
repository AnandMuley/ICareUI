app.service('PatientService',['$http',function($http){

	getPatient = function($scope){
		var patient = {
				firstName : $scope.firstName,
				lastName : $scope.lastName,
				mobileNo : $scope.mobileNo,
				emailId : $scope.emailId,
				addrLine1 : $scope.addrLine1,
				addrLine2 : $scope.addrLine2,
				city : $scope.city,
				state : $scope.state,
				zipCode : $scope.zipCode
		}
		return patient;
	}
	
	this.save = function($scope){
		$http({
			method : 'POST',
			url :'http://localhost:8080/ICareRest/rest/patient/create',
			headers : {
				'Content-Type':'application/json'
			},
			data : getPatient($scope)
		}).success(function(){
			$scope.message = 'Patient created successfully';
			$scope.isSuccess = true;
		}).error(function(){
			$scope.message = 'Some error occured';
			$scope.isSuccess = false;
		});
		
	}
	
	
}]);