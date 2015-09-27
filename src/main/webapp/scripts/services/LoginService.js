app.service('LoginService', [ '$http', function($http) {
	
	this.authenticate = function(user) {
		$http({
			url : '/ICareRest/rest/user/authenticate?uname='+user.username+'&pwd='+user.password,
			method : 'GET',
			headers : {
				'Content-type' : 'application/json'
			}
		}).success(function(data, status) {
			user.authenticated = data;
		}).error(function(data, status) {
			user.message = 'Something went wrong!';
		});
	}
	
} ]);