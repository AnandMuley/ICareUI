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
	
	this.toStringArr = function(prescriptions){
		var prescribed = [];
		$.each(prescriptions,function(index,val){
			prescribed.push(val.name);
		});
		return prescribed;
	}
	
	
	
	this.populateVisitData = function(scope){
		var symptoms = [];
		symptoms.push(scope.problems);
		
		var allergies = [];
		allergies.push(scope.allergies);
		
		var visitData = {
				patientId : scope.pid,
				prescriptions : self.toStringArr(scope.prescriptions),
				symptoms : symptoms,
				allergies : allergies
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