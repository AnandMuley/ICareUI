app.service('LoginService', [ '$http','$cookies', function($http,$cookies) {
	
	var self = this;
	
	this.generateAuthCookie = function(authCode){
		$cookies.auth = 'acg1-dsg3-352f-25sf';
	}
	
	this.authenticate = function(user,$location,$rootScope) {
		$http({
			url : '/ICareRest/rest/user/authenticate?uname='+user.username+'&pwd='+user.password,
			method : 'GET',
			headers : {
				'Content-type' : 'application/json'
			}
		}).success(function(data, status) {
			$location.path('/home');
			$rootScope.authenticated=true;
			user.authenticated = data;
			self.generateAuthCookie();
		}).error(function(data, status) {
			user.message = 'Something went wrong!';
		});
	}
	
} ]);