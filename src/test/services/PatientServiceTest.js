describe('PATIENT SERVICE TEST SUITE:',function(){
	
	var patientService,$scope,dataProvider;
	
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
		
		$httpBackend.when('POST','http://localhost:8080/ICareRest/rest/patient/create').respond(200);
		
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
		
		$httpBackend.when('POST','http://localhost:8080/ICareRest/rest/patient/create').respond(500);
		
		// WHEN
		patientService.save($scope);
		$httpBackend.flush();
		
		// THEN
		expect($scope.message).toBe(dataProvider.messages.GENERIC_ERROR);
		expect($scope.isSuccess).toBe(false);
	});
	
});