describe('HOME CONTROLLER TEST SUITE:',function(){
	
	var $scope,patientDataProvider,$httpBackend;
	
	beforeEach(module('ICareUI'));
	
	beforeEach(inject(function($injector,$controller,PatientService,PatientDataProvider){
		$scope = {};
		$httpBackend = $injector.get('$httpBackend');
		patientDataProvider = PatientDataProvider;
		createController = function(){
			return $controller('HomeController',{
				'$scope':$scope,
				'PatientService' : PatientService
			});
		}
		createController();
		
	}));
	
	it('Should test for page title',function(){
		// THEN
		expect($scope.pageTitle).toBe('Home Page');
	});
	
	it('Should save patient details',function(){
		// GIVEN
		$scope.patient = patientDataProvider.validPatient;
		
		$httpBackend.when('POST','rest/patient/save').respond(200);
		
		// WHEN
		$scope.createPatient($scope);
		$httpBackend.flush();
		
		// THEN
		expect($scope.message).toBe(patientDataProvider.messages.PATIENT_SAVE_SUCCESS);
	});
	
});