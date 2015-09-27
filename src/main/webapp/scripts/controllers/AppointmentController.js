controllers.controller('AppointmentController',
		['$scope','AppointmentService','PatientQueueService',function($scope,appointmentService,patientQueueService){
	$scope.pageTitle = 'Create Appointment';
	$scope.appointment = {
			onholdqueue : [],
			datedOn : new Date()
	}
	appointmentService.fetchBy($scope.appointment);
	
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
		// Here patient is appointment
		patientQueueService.putOnHold(patient.id,$scope.appointment);
	}
	
	$scope.moveBackToLive = function(patient){
		patientQueueService.moveToLive(patient.id,$scope.appointment);
	}
	
	
	
}]);