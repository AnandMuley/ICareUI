describe('PATIENT SERVICE TEST SUITE:',function(){

	var context = 'http://localhost:8090/ICareRest/rest/';
	var patientService,$scope,dataProvider;
	
	var REST_URLS = {
			PATIENT_CREATE : context+'patient/create',
			PATIENT_FIND_BY_NAME : context+'patient/findbyname?name=',
			PATIENT_UPDATE : context+'patient/update'
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
	
	it('Should populate patient model for editing',function(){
		// GIVEN
		var patientToEdit = patientDataProvider.patientToEdit;
		
		// WHEN
		patientService.populateReqModelsForEditing(patientToEdit,$scope);
		
		// THEN
		expect($scope.id).toBe(patientToEdit.id);
		
		expect($scope.firstName).toBe(patientToEdit.firstName);
		expect($scope.lastName).toBe(patientToEdit.lastName);
		
		expect($scope.mobileNo).toBe(patientToEdit.mobileNo);
		expect($scope.emailId).toBe(patientToEdit.emailId);
		
		expect($scope.addrLine1).toBe(patientToEdit.addrLine1);
		expect($scope.addrLine2).toBe(patientToEdit.addrLine2);
		expect($scope.city).toBe(patientToEdit.city);
		expect($scope.state).toBe(patientToEdit.state);
		expect($scope.zipCode).toBe(patientToEdit.zipCode);
	});
	
	it('Should update patient details',function(){
		// GIVEN
		$scope.firstName = 'Riya';
		$scope.lastName = 'Sen';
		$scope.mobileNo = 7820078500;
		$scope.emailId = 'riya@gmail.com';
		$scope.addrLine1 = 'London Bridge';
		$scope.addrLine2 = 'Oxford Street';
		$scope.city = 'London';
		$scope.state = 'Berkshire';
		$scope.zipCode = 'SL1 4DX';
		$scope.pid = 'PID201';
		
		$httpBackend.when('PUT',REST_URLS.PATIENT_UPDATE,function(dataSent){
			var patientUpdated = JSON.parse(dataSent);
			expect(patientUpdated.firstName).toBe('Riya');
			expect(patientUpdated.lastName).toBe('Sen');
			expect(patientUpdated.mobileNo).toBe(7820078500);
			expect(patientUpdated.emailId).toBe('riya@gmail.com');
			expect(patientUpdated.addrLine1).toBe('London Bridge');
			expect(patientUpdated.addrLine2).toBe('Oxford Street');
			expect(patientUpdated.city).toBe('London');
			expect(patientUpdated.state).toBe('Berkshire');
			expect(patientUpdated.zipCode).toBe('SL1 4DX');
			return true;
		}).respond(200);

		// WHEN
		patientService.update($scope);
		$httpBackend.flush();
		
		// THEN
		expect($scope.message).toBe('Patient updated successfully');
		expect($scope.isSuccess).toBe(true);
	});
	
	it('Should handle error scenario while updating patient details',function(){
		// GIVEN
		$scope.firstName = 'Riya';
		$scope.lastName = 'Sen';
		// MobileNo is greater than 10 digits
		$scope.mobileNo = 7820078500111;
		$scope.emailId = 'riya@gmail.com';
		$scope.addrLine1 = 'London Bridge';
		$scope.addrLine2 = 'Oxford Street';
		$scope.city = 'London';
		$scope.state = 'Berkshire';
		$scope.zipCode = 'SL1 4DX';
		$scope.id= 'PID101';
		
		$httpBackend.when('PUT',REST_URLS.PATIENT_UPDATE,function(dataSent){
			var patientUpdated = JSON.parse(dataSent);
			expect(patientUpdated.id).toBe('PID101');
			expect(patientUpdated.firstName).toBe('Riya');
			expect(patientUpdated.lastName).toBe('Sen');
			expect(patientUpdated.mobileNo).toBe(7820078500111);
			expect(patientUpdated.emailId).toBe('riya@gmail.com');
			expect(patientUpdated.addrLine1).toBe('London Bridge');
			expect(patientUpdated.addrLine2).toBe('Oxford Street');
			expect(patientUpdated.city).toBe('London');
			expect(patientUpdated.state).toBe('Berkshire');
			expect(patientUpdated.zipCode).toBe('SL1 4DX');
			return true;
		}).respond(500);

		// WHEN
		patientService.update($scope);
		$httpBackend.flush();
		
		// THEN
		expect($scope.message).toBe('Some error occured');
		expect($scope.isSuccess).toBe(false);
	});
	
});