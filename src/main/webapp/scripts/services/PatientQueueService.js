app.service('PatientQueueService',function(){
	
	var self = this;

	this.putOnHold = function(name,appointment){
		
		var onholdqueue = $.grep(appointment.livequeue,function(patient,index){
			return patient.name == name;
		});
		
		$.each(onholdqueue,function(index,patient){
			 appointment.onholdqueue.push(patient);
		});
		
		appointment.livequeue = $.grep(appointment.livequeue,function(patient,index){
			return patient.name != name;
		});
	}
	
	this.moveToLive = function(name,appointment){
		var livequeue = $.grep(appointment.onholdqueue,function(patient,index){
			return patient.name == name;
		});
		
		$.each(appointment.livequeue,function(index,patient){
			livequeue.push(patient);
		});
		appointment.livequeue = livequeue;
		
		appointment.onholdqueue = $.grep(appointment.onholdqueue,function(patient,index){
			return patient.name != name;
		});
	}
});