describe('APPOINTMENT CONTROLLER TEST SUITE:',function(){
	
	var appointmentController,$scope,appointmentFrm,appointmentDataProvider;
	var $httpBackend,$filter;
	var context = 'http://localhost:8090/ICareRest/rest/';
	
	beforeEach(module('ICareUI'));
	
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
		
		$httpBackend.when('GET',context+'appointment/findby?datedOn='+strDateOn).respond(200,appointmentsFound);
		
		// WHEN
		$scope.search(appointment);
		$httpBackend.flush();
		
		// THEN
		expect(appointment.livequeue.length).toBe(2);
	});
	
	it('Should move a patient from live queue to onhold queue',function(){
		// GIVEN
		$scope.appointment = {
			livequeue:[{
				'name' : 'Ankush Mehra'
			},{
				'name' : 'Raj Mehra'
			}],
			onholdqueue : []
		}
		var patient = {
				name : 'Ankush Mehra'
		};
		
		// WHEN
		$scope.putOnHold(patient);
		
		// THEN
		expect($scope.appointment.onholdqueue.length).toBe(1);
		expect($scope.appointment.onholdqueue[0].name).toBe('Ankush Mehra');
	});
	
	it('Should not replace the existing patients in onhold queue',function(){
		// GIVEN
		$scope.appointment = {
			livequeue:[{
				'name' : 'Ankush Mehra'
			},{
				'name' : 'Raj Mehra'
			},{
				'name' : 'Arjun Pandit'
			}],
			onholdqueue : []
		}
		var patient = {
				name : 'Ankush Mehra'
		};
		$scope.putOnHold(patient);
		
		var anotherPatient = {
				name : 'Arjun Pandit'
		}
		
		// WHEN
		$scope.putOnHold(anotherPatient);
		
		// THEN
		expect($scope.appointment.onholdqueue.length).toBe(2);
		expect($scope.appointment.onholdqueue[0].name).toBe('Ankush Mehra');
		expect($scope.appointment.onholdqueue[1].name).toBe('Arjun Pandit');
	});
	
	it('Should move the patient from onhold queue to live queue',function(){
		// GIVEN
		$scope.appointment = {
				livequeue : [{
					'name' : 'Ankush Mehra'
				}],
				onholdqueue:[{
					'name' : 'Raj Mehra'
				},{
					'name' : 'Arjun Pandit'
				}]
		}
		var patient = {
				name : 'Raj Mehra'
		};
		$scope.moveBackToLive(patient);

		var anotherPatient = {
				name : 'Arjun Pandit'
		}

		// WHEN
		$scope.moveBackToLive(anotherPatient);

		// THEN
		expect($scope.appointment.livequeue.length).toBe(3);
		expect($scope.appointment.livequeue[0].name).toBe('Arjun Pandit');
		expect($scope.appointment.livequeue[1].name).toBe('Raj Mehra');
		expect($scope.appointment.livequeue[2].name).toBe('Ankush Mehra');
	});
	
});