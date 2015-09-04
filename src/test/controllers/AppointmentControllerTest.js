describe('APPOINTMENT CONTROLLER TEST SUITE:',function(){
	
	var appointmentController,$scope,appointmentFrm,appointmentDataProvider;
	var $httpBackend;
	var context = 'http://localhost:8090/ICareRest/rest/';
	
	beforeEach(module('ICareUI'));
	
	beforeEach(inject(function($injector,$controller,AppointmentService,AppointmentDataProvider){
		$scope = $injector.get('$rootScope');
		
		appointmentDataProvider = AppointmentDataProvider;
		$httpBackend = $injector.get('$httpBackend');
		
		createController = function(){
			return $controller('AppointmentController',{
				'$scope' : $scope,
				'AppointmentService' : AppointmentService
			});
		}
		
		createController();
		
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
	
});