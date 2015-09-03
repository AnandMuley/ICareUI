app.service('AppointmentService',['$http',function($http){
	
	var context = 'http://localhost:8090/ICareRest/rest/';
	var self = this;
	var message;
	var appointments=[];
	
	this.createNew = function(appointment){
		$http({
			url : context+'appointment/create',
			method : 'POST',
			headers : {
				'Content-type':'application/json'
			},
			data : appointment
		}).success(function(status){
			self.setMessage('Appointment created successfully !');
		}).error(function(){
			self.setMessage('Something went wrong !');
		});
	}
	
	this.fetchBy = function(appointments){
		$http({
			url : context+'appointment/findby?datedOn='+appointments.datedOn,
			method : 'GET',
			headers : {
				'Content-type':'application/json'
			}
		}).success(function(data,status){
			appointments.list = data;
		}).error(function(data,status){
			console.log('Something went wrong !');
		});
	}
	
	this.setMessage = function(msg){
		message = msg;
	}
	
	this.getMessage = function(){
		return message;
	}
	
	this.setAppointments = function(appos){
		appointments = appos;
	}
	
	this.getAppointments = function(){
		return appointments;
	}
	
}]);