weatherApp.factory('currentWeatherAppData', function($resource, $q){
	
	var resource = $resource('https://api.openweathermap.org/data/2.5/weather?q=:city&appid=93b3f598062c08229b26a221408cb2f8', {city:'@city'});
		return {
			getCurrentWeatherData: function(city){
				var deferred = $q.defer();
				
				resource.get({city:city},
					function (data){
					deferred.resolve(data);
				},
				function(response){
					deferred.reject(response);
				});
				
				return deferred.promise;
			}
			
		};

});