app.service('PatientQueueService',function(){
	
	var self = this;

	this.putOnHold = function(name,appointment){
		
		appointment.onholdqueue = $.grep(appointment.livequeue,function(patient,index){
			return patient.name == name;
		});
		
		appointment.livequeue = $.grep(appointment.livequeue,function(patient,index){
			return patient.name != name;
		});
		
	}
	
});