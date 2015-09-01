describe('VISIT CONTROLLER TEST SUITE : ',function(){

	var context = 'http://localhost:8090/ICareRest/rest/';
	var medicineService,visitService,$scope,$httpBackend,$location,patientService;
	var dataProvider;
	var pid = 'abcd-12ad-hx23-12asr';
	
	
	var REST_URLS = {
		SEARCH_MEDICINE : context + 'medicine/searchbyname?name=',
		CREATE_VISIT : context + 'visit/create',
		FIND_ALL : context+'visit/findall?pid='
	};
	
	var HTTP_METHOD = {
			GET : 'GET',
			POST : 'POST'
	}
	
	beforeEach(module('ICareUI'));
	
	beforeEach(inject(function($injector,$controller,MedicineService,VisitService,MedicineDataProvider,PatientService){
		$scope = {};
		$httpBackend = $injector.get('$httpBackend');
		$location = $injector.get('$location');
		
		$location.search('PID',pid);
		
		patientService = PatientService;
		
		var patient = {
				id : 'abcd-12ad-hx23-12asr'
		}
		
		patientService.setCurrentPatient(patient);
		
		dataProvider = MedicineDataProvider;
		createController = function(){
			return $controller('VisitController',{
				'$scope':$scope,
				'MedicineService':MedicineService,
				'VisitService':VisitService,
				'PatientService' : PatientService
			});
		}
		createController();
	}));
	
	it('Should set the patientId as scoped variable',function(){
		// GIVEN
		// Data is setup i.e. The user is redirected from Search Patient Page
		// WHEN
		// Visit Controller is loaded
		// THEN
		expect($scope.patient).toBeDefined();
		expect($scope.patient.id).toBe(pid);
	});

	it('Should search medicine by name',function(){
		// GIVEN
		var name = 'Cro';
		$scope.medSrchTxt = name; 
		var medicines = dataProvider.findMedicinesByName; 
		
		$httpBackend.when(HTTP_METHOD.GET,REST_URLS.SEARCH_MEDICINE+name).respond(200,medicines);
		$httpBackend.when(HTTP_METHOD.GET,REST_URLS.FIND_ALL+'abcd-12ad-hx23-12asr').respond(200);
		
		// WHEN
		$scope.searchMedicine();
		$httpBackend.flush();
		
		// THEN	
		expect($scope.medicines.length).toBe(2);
	});
	
	it('Should return empty result if no medicines found',function(){
		// GIVEN
		var name = 'Crio';
		$scope.medSrchTxt = name; 
		
		$httpBackend.when(HTTP_METHOD.GET,REST_URLS.SEARCH_MEDICINE+name).respond(200,[]);
		$httpBackend.when(HTTP_METHOD.GET,REST_URLS.FIND_ALL+'abcd-12ad-hx23-12asr').respond(200);
		
		// WHEN
		$scope.searchMedicine();
		$httpBackend.flush();
		
		// THEN	
		expect($scope.medicines.length).toBe(0);
	});
	
	it('Should add medicine to prescribed ones',function(){
		// GIVEN
		var medicine = dataProvider.findMedicinesByName[0];
		medicine.checked = true;
		
		// WHEN
		$scope.prescribe(medicine);
				
		// THEN
		expect($scope.prescriptions.length).toBe(1);

		// CHECK FOR DUPLICATES
		
		// WHEN
		$scope.prescribe(medicine);
		// THEN
		// Should not add same medicine again to prescriptions
		expect($scope.prescriptions.length).toBe(1);
		
	});
	
	it('Should remove medicine from prescriptions',function(){
		// GIVEN
		var medicine = dataProvider.findMedicinesByName[0];
		medicine.checked = true;
		$scope.prescribe(medicine);
		expect($scope.prescriptions.length).toBe(1);
		
		medicine.checked = false;
		
		// WHEN
		$scope.prescribe(medicine);
				
		// THEN
		expect($scope.prescriptions.length).toBe(0);

	});
	
	it('Should create a visit record in DB',function(){
		// GIVEN
		$scope.prescriptions = dataProvider.prescriptions;
		$scope.symptoms = "Cough and Cold";
		$scope.allergies = "Peanuts";
		$scope.pid = 'abcd-12ad-hx23-12asr';
		$scope.medicines = [{"id":"101","name":"Crocine"}];
		$scope.medSrchTxt = "";
		
		$httpBackend.when(HTTP_METHOD.POST,REST_URLS.CREATE_VISIT,function(data){
			var dataSent = JSON.parse(data);
			var prescriptions = dataSent.prescriptions;
			expect(prescriptions.length).toBe(2);
			// Checking for medicines
			expect(prescriptions[0]).toBe('Crocine');
			expect(prescriptions[1]).toBe('Crocold');
			
			expect(dataSent.symptoms).toBe('Cough and Cold');
			expect(dataSent.allergies).toBe('Peanuts');
			
			expect(dataSent.patientId).toBe('abcd-12ad-hx23-12asr');
			
			return true;
		}).respond(200);
		
		$httpBackend.when(HTTP_METHOD.GET,REST_URLS.FIND_ALL+'abcd-12ad-hx23-12asr').respond(200);
		$httpBackend.when(HTTP_METHOD.GET,REST_URLS.FIND_ALL+'abcd-12ad-hx23-12asr').respond(200);
		
		// WHEN
		$scope.createVisit();
		$httpBackend.flush();
		
		// THEN
		expect($scope.message).toBe('Visit created successfully!');
		// Models should get cleared
		expect($scope.prescriptions.length).toBe(0);
		expect($scope.symptoms).toBe("");
		expect($scope.allergies).toBe("");
		// Should clear medicines array
		expect($scope.medicines.length).toBe(0);
		expect($scope.medSrchTxt).toBe("");
	});
	
});