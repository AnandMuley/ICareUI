app.service('PatientDataProvider',function(){
	this.validPatient = {
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
	this.messages = {
			PATIENT_SAVE_SUCCESS : 'Patient saved successfully',
			GENERIC_ERROR : 'Some error occured'
	}
});