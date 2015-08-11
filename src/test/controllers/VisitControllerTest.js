describe('VISIT CONTROLLER TEST SUITE : ',function(){

	var context = 'http://localhost:8090/ICareRest/rest/';
	var medicineService,visitService,$scope,$httpBackend,$location;
	var dataProvider;
	var pid = 'abcd-12ad-hx23-12asr';
	
	
	var REST_URLS = {
		SEARCH_MEDICINE : context + 'medicine/searchbyname?name=',
		CREATE_VISIT : context + 'visit/create'
	};
	
	var HTTP_METHOD = {
			GET : 'GET',
			POST : 'POST'
	}
	
	beforeEach(module('ICareUI'));
	
	beforeEach(inject(function($injector,$controller,MedicineService,VisitService,MedicineDataProvider){
		$scope = {};
		$httpBackend = $injector.get('$httpBackend');
		$location = $injector.get('$location');
		
		$location.search('PID',pid);
		
		dataProvider = MedicineDataProvider;
		createController = function(){
			return $controller('VisitController',{
				'$scope':$scope,
				'MedicineService':MedicineService,
				'VisitService':VisitService
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
		expect($scope.pid).toBeDefined();
		expect($scope.pid).toBe(pid);
	});

	it('Should search medicine by name',function(){
		// GIVEN
		var name = 'Cro';
		$scope.medSrchTxt = name; 
		var medicines = dataProvider.findMedicinesByName; 
		
		$httpBackend.when(HTTP_METHOD.GET,REST_URLS.SEARCH_MEDICINE+name).respond(200,medicines);
		
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
		$scope.problems = 'Cough and Cold';
		$scope.allergies = 'Peanuts';
		$scope.pid = 'abcd-12ad-hx23-12asr';
		
		$httpBackend.when(HTTP_METHOD.POST,REST_URLS.CREATE_VISIT,function(data){
			var dataSent = JSON.parse(data);
			var prescriptions = dataSent.prescriptions;
			expect(prescriptions.length).toBe(2);
			// Checking for medicines
			expect(prescriptions[0].id).toBe('MID101');
			expect(prescriptions[0].name).toBe('Crocine');
			expect(prescriptions[0].qty).toBe(1);
			expect(prescriptions[0].freq).toBe(2);
			
			expect(prescriptions[1].id).toBe('MID102');
			expect(prescriptions[1].name).toBe('Crocold');
			expect(prescriptions[1].qty).toBe(1);
			expect(prescriptions[1].freq).toBe(3);
			
			expect(dataSent.problems).toBe('Cough and Cold');
			expect(dataSent.allergies).toBe('Peanuts');
			
			expect(dataSent.pid).toBe('abcd-12ad-hx23-12asr');
			
			return true;
		}).respond(200);
		
		// WHEN
		$scope.createVisit();
		$httpBackend.flush();
		
		// THEN
		expect($scope.message).toBe('Visit created successfully!');
	});
	
});