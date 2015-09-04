controllers.controller('AppointmentController',['$scope','AppointmentService',function($scope,appointmentService){
	$scope.pageTitle = 'Create Appointment';
	
	$('#createAppointmentFrm').submit(function(e){
	    return false;
	});
	
	$scope.create = function(appointment){
		if(document.getElementById('createAppointmentFrm').checkValidity()){
			appointmentService.createNew(appointment);
		}
	}
	
	$scope.search = function(appointment){
		appointmentService.fetchBy(appointment);
	}
	
}]);