weatherApp.factory('fiveDayWeatherData', function($resource, $q){
	
	var resource = $resource('http://api.openweathermap.org/data/2.5/forecast?q=:city&appid=93b3f598062c08229b26a221408cb2f8', {city:'@city'});
		return {
			getFiveDayWeatherData: function(city){
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