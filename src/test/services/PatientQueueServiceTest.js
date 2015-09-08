describe('PATIENT QUEUE SERVICE TEST SUITE :',function(){
	
	var patientQueueService;
	
	beforeEach(module('ICareUI'));
	
	beforeEach(inject(function($injector,PatientQueueService){
		patientQueueService = PatientQueueService;
	}));
	
	it('Should put a patient onhold',function(){
		// GIVEN
		var appointment = {
				livequeue : [{'name':'Aron Johnson'}],
				onholdqueue : []
		};
		
		// WHEN
		patientQueueService.putOnHold('Aron Johnson',appointment);
		
		// THEN
		expect(appointment.livequeue.length).toBe(0);
		expect(appointment.onholdqueue.length).toBe(1);
	});
	
	it('Should put an onhold patient back to livequeue',function(){
		// GIVEN
		
		// WHEN
		
		// THEN
	});
	
	
});