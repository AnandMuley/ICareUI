app.service('AppointmentDataProvider', function() {
	this.createAppointment = {
		'firstName' : 'Ashish',
		'lastName' : 'Malhotra',
		'mobileNo' : 7890098700,
		'emailId' : 'ashish@gmail.com',
		'datedOn' : '09/04/2015'
	}

	this.fetchAppointments = {
		'id' : 'a2da-dad2-raw3-sa2f',
		'live' : [ {
			"_id" : "5606x2a944sea12789ec2x75",
			"name" : "Aron Johnson",
			"firstName" : "Aron",
			"lastName" : "Johnson",
			"mobileNo" : "9878989712",
			"emailId" : "aron@gmail.com",
			"datedOn" : "26-Oct-2015",
			"requestSubmittedOn" : "2015-09-26T11:42:33.689Z"
		}, {
			"_id" : "560684a944sea12789ec2x75",
			"name" : "Ron Wilkinson",
			"firstName" : "Ron",
			"lastName" : "Wilkinson",
			"mobileNo" : "9878989732",
			"emailId" : "ron@gmail.com",
			"datedOn" : "26-Oct-2015",
			"requestSubmittedOn" : "2015-09-26T11:50:33.689Z"
		} ]
	};

	this.onholdPatientQueue = {
		'id' : 'a2da-dad2-raw3-sa2f',
		'datedOn' : '18-Sep-2015',
		'onhold' : [ {
			"_id" : "5606x2a944sea12789ec2x75",
			"name" : "Aron Johnson",
			"firstName" : "Aron",
			"lastName" : "Johnson",
			"mobileNo" : "9878989712",
			"emailId" : "aron@gmail.com",
			"datedOn" : "26-Oct-2015",
			"requestSubmittedOn" : "2015-09-26T11:42:33.689Z"
		} ],
		'live' : [ {
			"_id" : "560684a944sea12789ec2x75",
			"name" : "Ron Wilkinson",
			"firstName" : "Ron",
			"lastName" : "Wilkinson",
			"mobileNo" : "9878989732",
			"emailId" : "ron@gmail.com",
			"datedOn" : "26-Oct-2015",
			"requestSubmittedOn" : "2015-09-26T11:50:33.689Z"
		} ]
	}
});