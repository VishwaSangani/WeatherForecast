var weatherApp = angular.module('weatherApp', ['ngResource', 'ngRoute','tc.chartjs','uiGmapgoogle-maps'])
	.config(function($routeProvider){
		$routeProvider.when('/currentWeather', {
			templateUrl:'templates/currentWeather.html',
			controller:'currentWeatherController'
		});
		$routeProvider.otherwise({redirectTo:'/currentWeather'});
		
	});
