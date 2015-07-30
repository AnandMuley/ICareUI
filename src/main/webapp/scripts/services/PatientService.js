app.service('PatientService',['$http',function($http){

	var context = 'http://localhost:8090/ICareRest/rest/';
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
	
	this.update = function($scope){
		var patient = getPatient($scope);
		patient.id = $scope.id;
		$http({
			method : 'PUT',
			url : context+'patient/update',
			headers : {
				'Content-type':'application/json'
			},
			data : patient
		}).success(function(){
			$scope.message = 'Patient updated successfully';
			$scope.isSuccess = true;
		}).error(function(){
			$scope.message = 'Some error occured';
			$scope.isSuccess = false;
		});
	}
	
	this.save = function($scope){
		$http({
			method : 'POST',
			url :context+'patient/create',
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
	
	this.searchByName = function($scope){
		$http({
			method:'GET',
			url:context+'patient/findbyname?name='+$scope.searchTxt,
			headers : {
				'Content-type':'application/json'
			}
		}).success(function(data){
			$scope.patientsFound = data;
		}).error(function(){
			$scope.message = 'Some error occured';
			$scope.isSuccess = false;
		});
	}
	
	this.populateReqModelsForEditing = function(patientToEdit,scope){
		scope.id = patientToEdit.id;
			
		scope.firstName = patientToEdit.firstName;
		scope.lastName = patientToEdit.lastName;
		
		scope.mobileNo = patientToEdit.mobileNo;
		scope.emailId = patientToEdit.emailId;
		
		scope.addrLine1 = patientToEdit.addrLine1;
		scope.addrLine2 = patientToEdit.addrLine2;
		scope.city = patientToEdit.city;
		scope.state = patientToEdit.state;
		scope.zipCode = patientToEdit.zipCode;
	}
	
	
}]);