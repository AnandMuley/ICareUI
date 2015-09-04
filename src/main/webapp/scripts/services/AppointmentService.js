app.service('AppointmentService',['$http','$filter',function($http,$filter){
	
	var context = 'http://localhost:8090/ICareRest/rest/';
	var self = this;
	var message;
	var appointments=[];
	
	this.createNew = function(appointment){
		appointment.datedOn = convertToValidFormat(new Date(appointment.datedOn));
		
		$http({
			url : context+'appointment/create',
			method : 'POST',
			headers : {
				'Content-type':'application/json'
			},
			data : appointment
		}).success(function(status){
			appointment.message = 'Appointment created successfully !';
			appointment.isSuccess = true;
			self.resetFormFields(appointment);
		}).error(function(){
			appointment.message = 'Something went wrong !';
			appointment.isSuccess = false;
		});
	}
	
	convertToValidFormat = function (datedOn){
		return $filter('date')(datedOn,'dd-MMM-yyyy');
	}
	
	this.fetchBy = function(appointment){
		$http({
			url : context+'appointment/findby?datedOn='+convertToValidFormat(appointment.datedOn),
			method : 'GET',
			headers : {
				'Content-type':'application/json'
			}
		}).success(function(data,status){
			appointment.resultlist = data;
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
	
	this.resetFormFields = function(appointment){
		appointment.firstName = null;
		appointment.lastName = null;
		appointment.emailId = null;
		appointment.mobileNo = null;
		appointment.datedOn = null;
	}
	
}]);