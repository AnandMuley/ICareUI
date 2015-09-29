describe('APPOINTMENT CONTROLLER TEST SUITE:',function(){
	
	var appointmentController,$scope,appointmentFrm,appointmentDataProvider;
	var $httpBackend,$filter;
	var context = 'http://localhost:8090/ICareRest/rest/';
	
	beforeEach(module('ICareUI'));
	
	function validateTodaysAppointments(){
		// Should fetch todays appointments on load of controller
		var today = new Date();
		var appointment = {
			datedOn : today
		}
		var strDateOn = $filter('date')(today,'dd-MMM-yyyy');
		var appointmentsFound = appointmentDataProvider.fetchAppointments;
		
		$httpBackend.when('GET',context+'appointment/findby?datedOn='+strDateOn+'&qid=').respond(200,appointmentsFound);
		// WHEN
		$httpBackend.flush();
	}
	
	beforeEach(inject(function($injector,$controller,AppointmentService,AppointmentDataProvider){
		$scope = $injector.get('$rootScope');
		
		appointmentDataProvider = AppointmentDataProvider;
		$httpBackend = $injector.get('$httpBackend');
		$filter = $injector.get('$filter');
		
		createController = function(){
			return $controller('AppointmentController',{
				'$scope' : $scope,
				'AppointmentService' : AppointmentService
			});
		}
		createController();
		validateTodaysAppointments();
		
	}));

	function createAppointmentForm(valid){
		if(valid){
			appointmentFrm = $('<form id="createAppointmentFrm"><input type="text"/></form>');
			$(document.body).append(appointmentFrm);
		}else{
			appointmentFrm = $('<form id="createAppointmentFrm"><input type="text" required="required"/></form>');
			$(document.body).append(appointmentFrm);
		}
	}
	
	afterEach(function(){
		if(appointmentFrm != undefined){
			appointmentFrm.remove();
		}
	});
	
	it('Should not create appointment if createAppointmentFrm is invalid',function(){
		// GIVEN
		var appointment = appointmentDataProvider.createAppointment;
		createAppointmentForm(false);
		
		// WHEN
		$scope.create(appointment);
		
		// THEN
		expect(appointment.message).toBe(undefined);
		expect(appointment.isSuccess).toBe(undefined);
	});
	
	it('Should create an appointment if createAppointmentFrm is valid',function(){
		// GIVEN
		var appointment = appointmentDataProvider.createAppointment;
		appointment.controller = true;
		createAppointmentForm(true);
		
		$httpBackend.when('POST',context+'appointment/create').respond(200);
		
		// WHEN
		$scope.create(appointment);
		$httpBackend.flush();
		
		// THEN
		expect(appointment.message).toBe('Appointment created successfully !');
		expect(appointment.isSuccess).toBe(true);
	});
	
	it('Should search an appointment for a given date',function(){
		// GIVEN
		var today = new Date();
		var appointment = {
			datedOn : today
		}
		var strDateOn = $filter('date')(today,'dd-MMM-yyyy');
		var appointmentsFound = appointmentDataProvider.fetchAppointments;
		
		$httpBackend.when('GET',context+'appointment/findby?datedOn='+strDateOn+'&qid=').respond(200,appointmentsFound);
		
		// WHEN
		$scope.search(appointment);
		$httpBackend.flush();
		
		// THEN
		expect(appointment.patientqueue.live.length).toBe(2);
	});
	
	it('Should move a patient from live queue to onhold queue',function(){
		// GIVEN
		$scope.appointment = {
				patientqueue : appointmentDataProvider.onholdPatientQueue
		};
			
		var patient = {
				id : 'asd2-ti2s-2234-dsa2',
				name : 'Rahul Verma'
		};

		// WHEN
		$scope.putOnHold(patient);

		// THEN
		expect($scope.appointment.patientqueue.onhold.length).toBe(1);
	});
	
	it('Should move the patient from onhold queue to live queue',function(){
		// GIVEN
		$scope.appointment = {
				patientqueue : appointmentDataProvider.onholdPatientQueue
		};
			
		var patient = {
				id : 'asd2-ti2s-24s4-dsa2',
				name : 'Raj Mehra'
		};
		
		var data = appointmentDataProvider.onholdPatientQueue;
		
		// WHEN
		$scope.moveBackToLive(patient);

		// THEN
		expect($scope.appointment.patientqueue.live.length).toBe(1);
	});
	
});