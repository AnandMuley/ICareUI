controllers.controller('AppointmentController',['$scope',function($scope){
	$scope.pageTitle = 'Create Appointment';
	
	$('#createAppointmentFrm').submit(function(e){
	    return false;
	});
	
	$scope.create = function(){
		if(document.getElementById('createAppointmentFrm').checkValidity()){
			console.log('Creating Appointment...');
		}
	}
	
}]);