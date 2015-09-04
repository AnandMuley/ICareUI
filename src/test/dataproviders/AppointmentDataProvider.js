app.service('AppointmentDataProvider',function(){
	this.createAppointment = {
			'firstName' : 'Ashish',
			'lastName' : 'Malhotra',
			'mobileNo' : 7890098700,
			'emailId' : 'ashish@gmail.com',
			'datedOn' : '09/04/2015'
	}
	
	this.fetchAppointments = [ {
		'id' : 'a2da-dad2-raw3-sa2f',
		'firstName' : 'Ashish',
		'lastName' : 'Malhotra',
		'mobileNo' : 7890098700,
		'emailId' : 'ashish@gmail.com',
		'datedOn' : '09/04/2015'
	},{
		'id' : 'a2da-dad2-raw3-sa1f',
		'firstName' : 'Ankur',
		'lastName' : 'Verma',
		'mobileNo' : 7890098300,
		'emailId' : 'ankur@gmail.com',
		'datedOn' : '09/04/2015'
	}];
});