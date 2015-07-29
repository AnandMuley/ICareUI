describe('PATIENT CONTROLLER TEST SUITE:',function(){
	
	var context = 'http://localhost:8090/ICareRest/rest/';
	var $scope,$httpBackend;
	
	var REST_URLS = {
			PATIENT_CREATE : context+'patient/create',
			PATIENT_FIND_BY_NAME : context+'patient/findbyname?name='
	}
	
	beforeEach(module('ICareUI'));
	
	beforeEach(inject(function($injector,$controller,PatientService,PatientDataProvider){
		$scope = {};
		patientDataProvider = PatientDataProvider;
		$httpBackend = $injector.get('$httpBackend');
		createController = function(){
			return $controller('PatientController',{
				'$scope' : $scope,
				'PatientService' : PatientService
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
	
});