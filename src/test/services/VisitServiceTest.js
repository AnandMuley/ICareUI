describe('VISIT SERVICE TEST SUITE :',function(){
	
	var visitService,medicineDataProvider,httpBackend;
	var context = 'http://localhost:8090/ICareRest/rest/';
	
	beforeEach(module('ICareUI'));
	
	beforeEach(inject(function($injector,VisitService,MedicineDataProvider){
		visitService = VisitService;
		scope = {};
		httpBackend = $injector.get('$httpBackend');
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
	
	it('Should check medicine if already prescribed before removing',function(){
		// GIVEN
		var medicine = medicineDataProvider.findMedicinesByName[0];
		
		// WHEN
		visitService.unprescribeMedicine(medicine,scope);
		
		// THEN
		expect(scope.prescriptions.length).toBe(0);
	});
	
	it('Should create visit',function(){
		// GIVEN
		scope.prescriptions = medicineDataProvider.prescriptions;
		scope.problems = "Cough and Cold";
		scope.allergies = "Peanuts";
		var patient = {
				id : '55e1c74044aea5be4f8e5a82'
		};
		
		var patients = [1];
		
		httpBackend.when('POST',context+'visit/create').respond(200);
		
		// WHEN
		visitService.createVisit(scope,patient);
		
		httpBackend.when('GET',context+'visit/findall?pid='+patient.id).respond(200);
		
		httpBackend.flush();
		
		// THEN
		expect(scope.message).toBe('Visit created successfully!');
	});
	
	it('Should show an error message if visit is not saved',function(){
		// GIVEN
		scope.prescriptions = medicineDataProvider.prescriptions;
		scope.problems = "Cough and Cold";
		scope.allergies = "Peanuts";
		var patient = {
				id : '55e1c74044aea5be4f8e5a82'
		};
		
		httpBackend.when('POST',context+'visit/create').respond(500);
		
		// WHEN
		visitService.createVisit(scope,patient);
		httpBackend.flush();
		
		// THEN
		expect(scope.message).toBe('Some error occurred !');
	});
	
	it('Should handle internal server error while fetching visits',function(){
		// GIVEN
		var patientId = 'PID101';
		var visits = [{
		            	"id":"VID101"  
		              }]
		
		httpBackend.when('GET',context+'visit/findall?pid='+patientId).respond(500);
		
		// WHEN
		visitService.fetchVisits(scope,patientId);
		httpBackend.flush();
		
		// THEN
		expect(scope.message).toBe('Some error occured !');
	});
	
});