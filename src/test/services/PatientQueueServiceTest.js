describe('PATIENT QUEUE SERVICE TEST SUITE :',function(){
	
	var patientQueueService,$httpBackend,appointmentDataProvider;
	
	beforeEach(module('ICareUI'));
	
	beforeEach(inject(function($injector,PatientQueueService,AppointmentDataProvider){
		patientQueueService = PatientQueueService;
		$httpBackend = $injector.get('$httpBackend');
		appointmentDataProvider = AppointmentDataProvider;
	}));
	
	it('Should put a patient in livequeue',function(){
		// GIVEN
		var appointment = {
				id  : 'a2da-dad2-raw3-sa2f',
				patientqueue : {
					id:'560684a944sea12789ec2x75'
				}
		};
		
		var data = appointmentDataProvider.onholdPatientQueue;
		
		$httpBackend.when('PUT','/ICareRest/rest/queue/movetolive?qid='+appointment.patientqueue.id+'&aid='+appointment.id).respond(200,data);

		// WHEN
		patientQueueService.moveToLive(appointment.id,appointment);
		$httpBackend.flush();
		
		// THEN
		expect(appointment.patientqueue.live.length).toBe(1);
		expect(appointment.patientqueue.onhold.length).toBe(1);
	});
	
	it('Should put a patient onhold',function(){
		// GIVEN
		var appointment = {
				id  : 'a2da-dad2-raw3-sa2f',
				patientqueue : {
					id:'560684a944sea12789ec2x75'
				}
		};
		
		var data = appointmentDataProvider.onholdPatientQueue;
		
		$httpBackend.when('PUT','/ICareRest/rest/queue/putonhold?qid='+appointment.patientqueue.id+'&aid='+appointment.id).respond(200,data);

		// WHEN
		patientQueueService.putOnHold(appointment.id,appointment);
		$httpBackend.flush();
		
		// THEN
		expect(appointment.patientqueue.live.length).toBe(1);
		expect(appointment.patientqueue.onhold.length).toBe(1);
	});
	
	it('Should return error response when trying to put a patient onhold',function(){
		// GIVEN
		var appointment = {
				id  : 'a2da-dad2-raw3-sa2f',
				patientqueue : {
					id:'560684a944sea12789ec2x75'
				}
		};
		
		var data = appointmentDataProvider.onholdPatientQueue;
		
		$httpBackend.when('PUT','/ICareRest/rest/queue/putonhold?qid='+appointment.patientqueue.id+'&aid='+appointment.id).respond(500);

		// WHEN
		patientQueueService.putOnHold(appointment.id,appointment);
		$httpBackend.flush();
		
		// THEN
		expect(appointment.patientqueue.status).toBe(500);
	});
	
	it('Should return error response when trying to put a patient to livequeue',function(){
		// GIVEN
		var appointment = {
				id  : 'a2da-dad2-raw3-sa2f',
				patientqueue : {
					id:'560684a944sea12789ec2x75'
				}
		};
		
		var data = appointmentDataProvider.onholdPatientQueue;
		
		$httpBackend.when('PUT','/ICareRest/rest/queue/movetolive?qid='+appointment.patientqueue.id+'&aid='+appointment.id).respond(500);

		// WHEN
		patientQueueService.moveToLive(appointment.id,appointment);
		$httpBackend.flush();
		
		// THEN
		expect(appointment.patientqueue.status).toBe(500);
	});
	
	
});