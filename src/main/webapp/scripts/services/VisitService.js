app.service('VisitService',['$http',function($http){

	var context = 'http://localhost:8090/ICareRest/rest/';
	var self = this;
	
	this.prescribeMedicine = function(medicine,scope){
		if(self.isAlreadyPrescribed(medicine,scope)==-1){
			scope.prescriptions.push(medicine);
		}
	}
	
	this.isAlreadyPrescribed = function(medicine,scope){
		return scope.prescriptions.indexOf(medicine);
	}
	
	this.unprescribeMedicine = function(medicine,scope){
		var index = self.isAlreadyPrescribed(medicine,scope);
		if(index>-1){
			scope.prescriptions.splice(index,1);
		}
	}
	
	this.populateVisitData = function(scope){
		var visitData = {
				prescriptions : scope.prescriptions,
				problems : scope.problems,
				allergies : scope.allergies
		}
		return visitData;
	}
	
	this.createVisit = function(scope){
		$http({
			method : 'POST',
			url : context + 'visit/create',
			headers : {
				'Content-type' : 'application/json'
			},
			data : self.populateVisitData(scope)
		}).success(function(data,status){
			scope.message = 'Visit created successfully!';
		}).error(function(data,status){
			scope.message = 'Some error occurred !';
		});
	}
	
}]);