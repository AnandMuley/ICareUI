app.service('PatientDataProvider',function(){
	this.validPatient = {
			id : 'abcd-12ad-hx23-12asr',
			firstName : 'Arun',
			lastName : 'Prajapati',
			mobileNo : 9820098300,
			emailId : 'arun@gmail.com',
			addrLine1 : 'Address Line 1',
			addrLine2 : 'Address Line 2',
			city : 'Pune',
			state : 'Maharashtra',
			zipCode : 444001
	};
	this.patientToEdit = {
			id : '55b753cde4b0a9dc1e702aa8',
			firstName : 'Arun',
			lastName : 'Prajapati',
			mobileNo : 9820098300,
			emailId : 'arun@gmail.com',
			addrLine1 : 'Address Line 1',
			addrLine2 : '',
			city : 'Pune',
			state : 'Maharashtra',
			zipCode : 444001
	};
	this.messages = {
			PATIENT_SAVE_SUCCESS : 'Patient created successfully',
			GENERIC_ERROR : 'Some error occured'
	}
	this.validPatientsFound = [ {
		'id' : 'PID101',
		'firstName' : 'Aron',
		'middleName' : 'John',
		'lastName' : 'Johnson',
		'mobileNo' : 9860098500,
		'emailId' : 'aron@gmail.com',
		'addrLine1' : '201,Sky Heights',
		'addrLine2' : 'EB Road',
		'city' : 'Mumbai',
		'state' : 'Maharashtra',
		'zipCode' : '444001'
	}, {
		'id' : 'PID102',
		'firstName' : 'Albert',
		'middleName' : 'Thomas',
		'lastName' : 'Aron',
		'mobileNo' : 9860098501,
		'emailId' : 'albert@gmail.com',
		'addrLine1' : '202,Sky Heights',
		'addrLine2' : 'EB Road',
		'city' : 'Mumbai',
		'state' : 'Maharashtra',
		'zipCode' : '444001'
	} ]
});