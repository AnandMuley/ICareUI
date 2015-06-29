//Create a model factory
function Patient () {
	this.firstName = '',
	this.lastName = '',
	this.mobileNo = 0,
	this.emailId = '',
	this.address = function() {
		this.addrLine1 = '',
		this.addrLine2 = '',
		this.city = '',
		this.state = '',
		this.zipCode = 0
	}
};