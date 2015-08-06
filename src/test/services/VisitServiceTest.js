describe('VISIT SERVICE TEST SUITE :',function(){
	
	var visitService,medicineDataProvider;
	
	beforeEach(module('ICareUI'));
	
	beforeEach(inject(function($injector,VisitService,MedicineDataProvider){
		visitService = VisitService;
		scope = {};
		scope.prescriptions = [];
		medicineDataProvider = MedicineDataProvider;
	}));
	
	it('Should add medicine to prescription',function(){
		// GIVEN
		var medicine = medicineDataProvider.findMedicinesByName[0];
		
		// WHEN
		visitService.prescribeMedicine(medicine,scope);
		
		// THEN
		expect(scope.prescriptions.length).toBe(1);
		expect(scope.prescriptions[0].id).toBe('MID101');
		expect(scope.prescriptions[0].name).toBe('Crocine');
	});
	
	it('Should not allow duplicate medicines in prescriptions',function(){
		// GIVEN
		var medicine = medicineDataProvider.findMedicinesByName[0];
		
		// WHEN
		visitService.prescribeMedicine(medicine,scope);
		visitService.prescribeMedicine(medicine,scope);
		
		// THEN
		expect(scope.prescriptions.length).toBe(1);
		expect(scope.prescriptions[0].id).toBe('MID101');
		expect(scope.prescriptions[0].name).toBe('Crocine');
	});
	
	it('Should remove medicine from prescription',function(){
		// GIVEN
		scope.prescriptions.push(medicineDataProvider.findMedicinesByName[0]);
		scope.prescriptions.push(medicineDataProvider.findMedicinesByName[1]);
		var medicine = medicineDataProvider.findMedicinesByName[0];
		
		// WHEN
		visitService.unprescribeMedicine(medicine,scope);
		
		// THEN
		expect(scope.prescriptions.length).toBe(1);
		expect(scope.prescriptions[0].id).toBe('MID102');
		expect(scope.prescriptions[0].name).toBe('Crocold');
	});
	
});