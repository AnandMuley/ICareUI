describe('PATIENT SERVICE TEST SUITE:',function(){

	var context = 'http://localhost:8090/ICareRest/rest/';
	var patientService,$scope,dataProvider;
	
	var REST_URLS = {
			PATIENT_CREATE : context+'patient/create',
			PATIENT_FIND_BY_NAME : context+'patient/findbyname?name='
	}
	
	beforeEach(module('ICareUI'));
	beforeEach(inject(function($injector,PatientService,PatientDataProvider){
		patientService = PatientService;
		$httpBackend = $injector.get('$httpBackend');
		$scope = {};
		dataProvider = PatientDataProvider;
	}));
	
	it('Should save the patient details',function(){
		// GIVEN
		$scope.message = '';
		$scope.patient = dataProvider.validPatient;
		
		$httpBackend.whenPOST(REST_URLS.PATIENT_CREATE).respond(200);
		
		// WHEN
		patientService.save($scope);
		$httpBackend.flush();
		
		// THEN
		expect($scope.message).toBe(dataProvider.messages.PATIENT_SAVE_SUCCESS);
		expect($scope.isSuccess).toBe(true);
	});
	
	it('Should return error message for errors',function(){
		// GIVEN
		$scope.message = '';
		$scope.patient = dataProvider.validPatient;
		
		$httpBackend.whenPOST(REST_URLS.PATIENT_CREATE).respond(500);
		
		// WHEN
		patientService.save($scope);
		$httpBackend.flush();
		
		// THEN
		expect($scope.message).toBe(dataProvider.messages.GENERIC_ERROR);
		expect($scope.isSuccess).toBe(false);
	});
	
	it('Should return list of patients matching given name',function(){
		// GIVEN
		
		$scope.searchTxt='Aron';
		
		var patients = dataProvider.validPatientsFound;
		
		$httpBackend.when('GET',REST_URLS.PATIENT_FIND_BY_NAME+$scope.searchTxt).respond(200,patients);
		
		// WHEN
		patientService.searchByName($scope);
		$httpBackend.flush();
		
		// THEN
		expect($scope.patientsFound.length).toBe(2);
	});
	
});