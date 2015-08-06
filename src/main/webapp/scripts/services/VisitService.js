app.service('VisitService',['$http',function($http){

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
	
}]);