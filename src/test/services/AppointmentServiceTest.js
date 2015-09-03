describe('APPOINTMENT SERVICE TEST SUITE:', function() {
	
	var appointmentService,appointmentDataProvider,$httpBackend;
	var context = 'http://localhost:8090/ICareRest/rest/';
	var appointments;
	
	beforeEach(module('ICareUI'));
	
	beforeEach(inject(function($injector,AppointmentService,AppointmentDataProvider){
		appointmentService = AppointmentService;
		appointmentDataProvider = AppointmentDataProvider;
		$httpBackend = $injector.get('$httpBackend');
		patient = {};
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
			expect(appointmentData.forDate).toBe('09/04/2015');
			return true
		}).respond(200);
		
		// WHEN
		var message = appointmentService.createNew(appointment);
		$httpBackend.flush();
		
		// THEN
		expect(appointmentService.getMessage()).toBe('Appointment created successfully !');
	});
	
	it('Should handle error scenario',function(){
		// GIVEN
		var appointment = appointmentDataProvider.createAppointment;
		appointment.forDate = '09/04/2012';
		var message = '';
		
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
		expect(appointmentService.getMessage()).toBe('Something went wrong !');
	});
	
	it('Should fetch today"s appointments',function(){
		// GIVEN
		appointments = {
				datedOn :'09/04/2015'
		}
		
		var appointmentsFound = appointmentDataProvider.fetchAppointments;
		
		$httpBackend.when('GET',context+'appointment/findby?datedOn='+appointments.datedOn).respond(200,appointmentsFound);
		
		// WHEN
		appointmentService.fetchBy(appointments);
		$httpBackend.flush();
		
		// THEN
		expect(appointments.list.length).toBe(2);
	});
	
});