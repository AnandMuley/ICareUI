app.service('LoginService',function(){
	this.authenticate = function(uname,pass){
		if(uname == 'a' && pass=='a'){
			return true;
		}
		return false;
	}
});