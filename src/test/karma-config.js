module.exports = function(config) {
	config.set({
		frameworks : [ 'jasmine' ],
		files : [ 'node_modules/jquery/dist/jquery.min.js',
				'node_modules/angular/angular.js',
				'node_modules/angular-mocks/angular-mocks.js',
				'node_modules/angular-route/angular-route.js',
				'../main/webapp/scripts/**/*.js', 'controllers/*.js',
				'services/*.js', 'dataproviders/*.js' ],
//		preprocessors : {
//			'../main/webapp/scripts/**/*.js' : 'coverage'
//		},
//		reporters : [ 'coverage', 'spec' ],
		reporters : ['spec'],
		autoWatch : true,
		browsers : [ 'PhantomJS' ],
		plugins : [ 'karma-jasmine', 'karma-phantomjs-launcher',
				'karma-coverage', 'karma-spec-reporter' ],
		colors : true
	});
}
