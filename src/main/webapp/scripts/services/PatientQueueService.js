app.service('PatientQueueService',['$http',function($http){
	
	var self = this;

	this.putOnHold = function(appointmentId,appointment){
		$http({
			url : '/ICareRest/rest/queue/putonhold?qid='+appointment.patientqueue.id+'&aid='+appointmentId,
			method : 'PUT',
			headers : {
				'Content-type' : 'application/json'
			}
		}).success(function(data,status){
			appointment.patientqueue = data;
		}).error(function(data,status){
			appointment.patientqueue.status = status;
		});
	}
	
	this.moveToLive = function(appointmentId,appointment){
		$http({
			url : '/ICareRest/rest/queue/movetolive?qid='+appointment.patientqueue.id+'&aid='+appointmentId,
			method : 'PUT',
			headers : {
				'Content-type' : 'application/json'
			}
		}).success(function(data,status){
			appointment.patientqueue = data;
		}).error(function(data,status){
			appointment.patientqueue.status = status;
		});
	}
}]);