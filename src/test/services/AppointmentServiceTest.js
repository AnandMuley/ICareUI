describe('APPOINTMENT SERVICE TEST SUITE:', function() {
	
	var appointmentService,appointmentDataProvider,$httpBackend;
	var context = 'http://localhost:8090/ICareRest/rest/';
	var patient,$filter;
	
	beforeEach(module('ICareUI'));
	
	beforeEach(inject(function($injector,AppointmentService,AppointmentDataProvider){
		appointmentService = AppointmentService;
		appointmentDataProvider = AppointmentDataProvider;
		$httpBackend = $injector.get('$httpBackend');
		patient = {};
		$filter = $injector.get('$filter');
	}));
	
	it('Should create appointment',function(){
		// GIVEN
		var appointment = appointmentDataProvider.createAppointment;
		var message = '';
		
		$httpBackend.when('POST',context+'appointment/create',function(dataSent){
			var appointmentData = JSON.parse(dataSent);
			expect(appointmentData.firstName).toBe('Ashish');
			expect(appointmentData.lastName).toBe('Malhotra');
			expect(appointmentData.mobileNo).toBe(7890098700);
			expect(appointmentData.emailId).toBe('ashish@gmail.com');
			expect(appointmentData.datedOn).toBe($filter('date')(appointment.datedOn,'dd-MMM-yyyy'));
			return true
		}).respond(200);
		
		// WHEN
		var message = appointmentService.createNew(appointment);
		$httpBackend.flush();
		
		// THEN
		expect(appointment.message).toBe('Appointment created successfully !');
		// Should reset form fields
		expect(appointment.firstName).toBe(null);
		expect(appointment.lastName).toBe(null);
		expect(appointment.emailId).toBe(null);
		expect(appointment.mobileNo).toBe(null);
		expect(appointment.datedOn).toBe(null);
		
	});
	
	it('Should handle error scenario',function(){
		// GIVEN
		var appointment = appointmentDataProvider.createAppointment;
		appointment.datedOn = '09/04/2012';
		
		$httpBackend.when('POST',context+'appointment/create',function(dataSent){
			var appointmentData = JSON.parse(dataSent);
			expect(appointmentData.firstName).toBe('Ashish');
			expect(appointmentData.lastName).toBe('Malhotra');
			expect(appointmentData.mobileNo).toBe(7890098700);
			expect(appointmentData.emailId).toBe('ashish@gmail.com');
			return true
		}).respond(500);
		
		// WHEN
		var message = appointmentService.createNew(appointment);
		$httpBackend.flush();
		
		// THEN
		expect(appointment.message).toBe('Something went wrong !');
	});
	
	it('Should fetch today"s appointments',function(){
		// GIVEN
		var today = new Date();
		appointment = {
			datedOn : today
		}
		var strDateOn = $filter('date')(today,'dd-MMM-yyyy');
		
		var appointmentsFound = appointmentDataProvider.fetchAppointments;
		
		$httpBackend.when('GET',context+'appointment/findby?datedOn='+strDateOn+'&qid=').respond(200,appointmentsFound);
		 
		// WHEN
		appointmentService.fetchBy(appointment);
		$httpBackend.flush();
		
		// THEN
		expect(appointment.patientqueue.live.length).toBe(2);
	});
	
	it('Should fetch today"s appointments for given date and queueid',function(){
		// GIVEN
		var queueId = 'a2da-dad2-raw3-sa2f';
		var today = new Date();
		appointment = {
			patientqueue : {
				id : queueId
			},
			datedOn : today
		}
		var strDateOn = $filter('date')(today,'dd-MMM-yyyy');
		
		var appointmentsFound = appointmentDataProvider.fetchAppointments;
		
		$httpBackend.when('GET',context+'appointment/findby?datedOn='+strDateOn+'&qid='+queueId).respond(200,appointmentsFound);
		 
		// WHEN
		appointmentService.fetchBy(appointment);
		$httpBackend.flush();
		
		// THEN
		expect(appointment.patientqueue.live.length).toBe(2);
	});
	
	it('Should show an error message if unable to fetch appointments',function(){
		// GIVEN
		var today = new Date();
		appointment = {
			datedOn : today
		}
		var strDateOn = $filter('date')(today,'dd-MMM-yyyy');
		
		var appointmentsFound = appointmentDataProvider.fetchAppointments;
		
		$httpBackend.when('GET',context+'appointment/findby?datedOn='+strDateOn+'&qid=').respond(500);
		 
		// WHEN
		appointmentService.fetchBy(appointment);
		$httpBackend.flush();
		
		// THEN
		expect(appointment.message).toBe('Something went wrong !');
	});
	
	it('Should set and get appointments for sharing across controllers',function(){
		// GIVEN
		var appointments = appointmentDataProvider.fetchAppointments;
		
		// WHEN
		appointmentService.setAppointments(appointments);
		
		// THEN
		expect(appointmentService.getAppointments().id).toBe('a2da-dad2-raw3-sa2f');
	});
	
	it('Should set and get the same message',function(){
		// GIVEN
		var message = 'Appointment created successfully !';
		appointmentService.setMessage(message);
		
		// WHEN
		var actual = appointmentService.getMessage();
		
		// THEN
		expect(actual).toBe(message);
	});
	
});