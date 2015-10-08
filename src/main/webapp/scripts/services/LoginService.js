app.service('LoginService', [ '$http','$cookies', function($http,$cookies) {
	
	var self = this;
	
	this.authenticate = function(user,$location,$rootScope) {
		$http({
			url : '/ICareRest/rest/user/authenticate?uname='+user.username+'&pwd='+user.password,
			method : 'GET',
			headers : {
				'Content-type' : 'application/json'
			}
		}).success(function(data, status) {
			$location.path('/home');
			$rootScope.auth = data;
		}).error(function(data, status) {
			user.message = 'Something went wrong!';
		});
	}
	
} ]);