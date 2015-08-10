app.service('MedicineDataProvider',function(){
	this.findMedicinesByName = [{
		'id':'MID101',
		'name' : 'Crocine'
	},{
		'id':'MID102',
		'name' : 'Crocold'
	}];
	
	this.prescriptions = [{
		'id':'MID101',
		'name' : 'Crocine',
		'qty' : 1,
		'freq' : 2
	},{
		'id':'MID102',
		'name' : 'Crocold',
		'qty' : 1,
		'freq' : 3
	}]
});