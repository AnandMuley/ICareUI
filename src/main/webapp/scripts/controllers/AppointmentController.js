controllers.controller('AppointmentController',
		['$scope','AppointmentService','PatientQueueService',function($scope,appointmentService,patientQueueService){
	$scope.pageTitle = 'Create Appointment';
	$scope.appointment = {
			onholdqueue : []
	}
	
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
	
	$scope.putOnHold = function(patient){
		patientQueueService.putOnHold(patient.name,$scope.appointment);
	}
	
	$scope.moveBackToLive = function(patient){
		patientQueueService.moveToLive(patient.name,$scope.appointment);
	}
	
	
	
}]);