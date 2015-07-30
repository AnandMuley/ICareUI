describe('PATIENT CONTROLLER TEST SUITE:',function(){
	
	var context = 'http://localhost:8090/ICareRest/rest/';
	var $scope,$httpBackend,$location;
	
	var REST_URLS = {
			PATIENT_CREATE : context+'patient/create',
			PATIENT_FIND_BY_NAME : context+'patient/findbyname?name='
	}
	
	beforeEach(module('ICareUI'));
	
	beforeEach(inject(function($injector,$controller,PatientService,PatientDataProvider){
		$scope = {};
		patientDataProvider = PatientDataProvider;
		$httpBackend = $injector.get('$httpBackend');
		$location = $injector.get('$location');
		createController = function(){
			return $controller('PatientController',{
				'$scope' : $scope,
				'PatientService' : PatientService,
				'$location' : $location
			})
		}
		createController();
	}));
	
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
		var patient = $location.search().PTE;
		expect(patient.id).toBe(patientToEdit.id);
		expect(patient.editingPatient).toBe(true);
		expect(patient.pageTitle).toBe('Edit Patient');
		expect($location.path()).toBe('/patient/create');
	});
	
});