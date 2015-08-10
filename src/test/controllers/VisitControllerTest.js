describe('VISIT CONTROLLER TEST SUITE : ',function(){

	var context = 'http://localhost:8090/ICareRest/rest/';
	var medicineService,visitService,$scope,$httpBackend;
	var dataProvider;
	
	var REST_URLS = {
		SEARCH_MEDICINE : context + 'medicine/searchbyname?name='	
	};
	
	beforeEach(module('ICareUI'));
	
	beforeEach(inject(function($injector,$controller,MedicineService,VisitService,MedicineDataProvider){
		$scope = {};
		$httpBackend = $injector.get('$httpBackend');
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
	
	it('Should search medicine by name',function(){
		// GIVEN
		var name = 'Cro';
		$scope.medSrchTxt = name; 
		var medicines = dataProvider.findMedicinesByName; 
		
		$httpBackend.when('GET',REST_URLS.SEARCH_MEDICINE+name).respond(200,medicines);
		
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
		
		$httpBackend.when('GET',REST_URLS.SEARCH_MEDICINE+name).respond(200,[]);
		
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
	
});