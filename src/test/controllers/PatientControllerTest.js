describe('PATIENT CONTROLLER TEST SUITE:',function(){
	
	var $scope,$httpBackend;
	
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
		
		$httpBackend.when('POST','http://localhost:8080/ICareRest/rest/patient/create').respond(200);
		
		// WHEN
		$scope.create($scope);
		$httpBackend.flush();
		
		// THEN
		expect($scope.message).toBe(patientDataProvider.messages.PATIENT_SAVE_SUCCESS);
	});
	
	it('Should search a patient by name',function(){
		
	});
	
});