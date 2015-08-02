describe('MEDICINE SERVICE TEST SUITE : ',function(){
	
	var context = 'http://localhost:8090/ICareRest/rest/';
	var medicineService,httpBackend,scope,medicineDataProvider;
	
	// REST URLS
	var REST_URLS = {
			FIND_BY_NAME : context+'medicine/searchbyname?name='
	}
	
	beforeEach(module('ICareUI'));
	beforeEach(inject(function($injector,MedicineService,MedicineDataProvider){
		medicineService = MedicineService;
		scope = {};
		medicineDataProvider = MedicineDataProvider;
		httpBackend = $injector.get('$httpBackend');
	}));
	
	it('Should find medicine by name',function(){
		// GIVEN
		var name = 'croc';
		var medicines = medicineDataProvider.findMedicinesByName;
		
		httpBackend.when('GET',REST_URLS.FIND_BY_NAME+name).respond(200,medicines);

		// WHEN
		medicineService.findByName(name,scope);
		httpBackend.flush();
		
		// THEN
		expect(scope.medicines.length).toBe(2);
	});
	
	it('Should handle scenario when no medicine found',function(){
		// GIVEN
		var name = 'Victory';
		var medicines = medicineDataProvider.findMedicinesByName;
		
		httpBackend.when('GET',REST_URLS.FIND_BY_NAME+name).respond(404);

		// WHEN
		medicineService.findByName(name,scope);
		httpBackend.flush();
		
		// THEN
		expect(scope.message).toBe('No medicines found');
		expect(scope.medicines.length).toBe(0);
	});
	
	
	
});