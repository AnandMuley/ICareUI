describe('PATIENT CONTROLLER TEST SUITE:',function(){
	
	var context = 'http://localhost:8090/ICareRest/rest/';
	var $scope,$httpBackend,$location,patientService;
	var pid = 'abcd-12ad-hx23-12asr';
	var createController;
	
	var REST_URLS = {
			PATIENT_CREATE : context+'patient/create',
			PATIENT_FIND_BY_NAME : context+'patient/findbyname?name=',
			PATIENT_UPDATE : context + 'patient/update'
	}
	
	beforeEach(module('ICareUI'));
	
	beforeEach(inject(function($injector,$controller,PatientService,PatientDataProvider){
		$scope = {};
		patientDataProvider = PatientDataProvider;
		$httpBackend = $injector.get('$httpBackend');
		$location = $injector.get('$location');
		patientService = PatientService;
		
		var patientToEdit = {
				isEditing : false
		};
		
		patientService.setCurrentPatient(patientToEdit);
		
		createController = function(){
			return $controller('PatientController',{
				'$scope' : $scope,
				'PatientService' : PatientService,
				'$location' : $location
			})
		}
		createController();
	}));
	
	it('Should default configurations',function(){
		// GIVEN
		// Patient is editing
		var patientToEdit = {
				isEditing : true
		};
		patientService.setCurrentPatient(patientToEdit);
		createController();
		
		// WHEN
		// Controller is created
		
		// THEN
		expect($scope.pageTitle).toBe('Edit Patient');
		expect($scope.isEditing).toBe(true);
		// Check if required models are populated for editing
	});
	
	it('Should save patient details',function(){
		// GIVEN
		$scope.patient = patientDataProvider.validPatient;
		
		$httpBackend.when('POST',REST_URLS.PATIENT_CREATE).respond(200);
		
		// WHEN
		$scope.create();
		$httpBackend.flush();
		
		// THEN
		expect($scope.message).toBe(patientDataProvider.messages.PATIENT_SAVE_SUCCESS);
	});
	
	it('Should update patient details',function(){
		// GIVEN
		// Patient is being edited
		
		$httpBackend.when('PUT',REST_URLS.PATIENT_UPDATE).respond(200);
		
		// WHEN
		$scope.update();
		$httpBackend.flush();
		
		// THEN
		expect($scope.message).toBe('Patient updated successfully');
		expect($scope.isSuccess).toBe(true);
		// Should reset models after updating..
		expect($scope.id).toBe(null);
		expect($scope.firstName).toBe(null);
		expect($scope.lastName).toBe(null);
		expect($scope.mobileNo).toBe(null);
		expect($scope.emailId).toBe(null);
		expect($scope.addrLine1).toBe(null);
		expect($scope.addrLine2).toBe(null);
		expect($scope.city).toBe(null);
		expect($scope.state).toBe(null);
		expect($scope.zipCode).toBe(null);
	});
	
	it('Should search a patient by name',function(){
		// GIVEN
		$scope.searchTxt = 'Aron';
		var patients = patientDataProvider.validPatientsFound; 
		
		$httpBackend.when('GET',REST_URLS.PATIENT_FIND_BY_NAME+$scope.searchTxt).respond(200,patients);
		
		// WHEN
		$scope.search();
		$httpBackend.flush();
		
		// THEN
		expect($scope.patientsFound.length).toBe(2);
	});
	
	it('Should redirect to add patient page with populated patient details',function(){
		// GIVEN
		var patientToEdit = patientDataProvider.patientToEdit;
		
		// WHEN
		$scope.editPatient(patientToEdit);
		
		// THEN
		var patient = patientService.getPatient();
		expect(patient.id).toBe(patientToEdit.id);
		expect(patient.isEditing).toBe(true);
		expect($location.path()).toBe('/patient/edit');
	});
	
	it('Should redirect to createVisit page',function(){
		// GIVEN
		var patient = patientDataProvider.validPatient;
		
		// WHEN
		$scope.createVisit(patient);
		
		// THEN
		var patient = patientService.getPatient();
		expect(patient.id).toBe(pid);
		expect($location.path()).toBe('/visit/create');
	});
	
});