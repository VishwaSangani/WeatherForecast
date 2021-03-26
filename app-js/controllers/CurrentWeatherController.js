weatherApp.controller(
  "currentWeatherController",
  function currentWeatherController($scope,$filter,currentWeatherAppData,fiveDayWeatherData,uiGmapIsReady){

    $scope.fiveDayforecast;

    $scope.searchCurrentWeatherByCity = function(city) {
      currentWeatherAppData.getCurrentWeatherData(city).then(function(res) {
        $scope.weatherData = res;
        $scope.weatherDate = res.dt * 1000;
      });
    };

    $scope.searchFiveDayWeatherByCity = function(city) {
      fiveDayWeatherData.getFiveDayWeatherData(city).then(function(res) {

        $scope.labels = [];
        $scope.fiveday = [];
        $scope.data = [];

        res.cod = +(res.cod);
        let val=(res.list[0].wind.deg/22.5)+.5
        val = val | 0;
        let arr=["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"]
        $scope.direction = arr[(val % 16)];
        $scope.fiveDayforecast = res;       
     
        let temp = $filter('date')(new Date($scope.fiveDayforecast.list[0].dt_txt), 'HH:mm')
        $scope.fiveday = $scope.fiveDayforecast.list.filter((element,i) => {

          element.dt_txt = new Date(element.dt_txt);
          if(i==0 || $filter('date')(element.dt_txt, 'HH:mm') == temp ){
            element.dt_txt = new Date(element.dt_txt);
            return element;
          }    
        });
        $scope.fiveday.splice(0,1);
        
        
        $scope.fiveDayforecast.list.forEach((element,i) => {

            element.dt_txt = new Date(element.dt_txt);
            if(i==0 || $filter('date')(element.dt_txt, 'HH:mm') == "00:00" )
            {
              $scope.labels.push($filter('date')(element.dt_txt, 'dd MMM HH:mm'));
            }
            else{
              $scope.labels.push($filter('date')(element.dt_txt, 'HH:mm'));
            }  
 
          $scope.data.push(parseInt(element.main.temp - 273));
        });

        console.log($scope.data);

        $scope.data = {
          labels: $scope.labels,
          datasets: [
            {
                label: "A",
                borderColor: 'rgba(255,99,132,1)',
                data: $scope.data
            }

          ]
      };

      $scope.options = {
          scales: {
              xAxes: [{
                  stacked: true
              }],
              yAxes: [{
                  stacked: true
              }]
          },
          legend: {
              display: true,
              labels: {
                  fontColor: 'rgb(255, 99, 132)'
              }
          },
          title: {
              display: true,
              text: '5 day / 3 hour forecast vs Temperature in Celcius'
          }
      };


      $scope.showMap();
    
      // $scope.update = true;
   
      // uiGmapIsReady.promise()
      // .then(function (map_instances) {
      //     $scope.map.control.refresh({latitude: 48,longitude: 2.3});
      // });

    // $scope.$watch('update', function(newVal, oldVal) {
    //   console.log('new value of update is ' + $scope.update);
    //   if (newVal) {
    //     $scope.mapControlls.refresh();
    //   }
    // });

      // $scope.map.addListener("center_changed", () => {
      //   // 3 seconds after the center of the map has changed, pan back to the
      //   // marker.
      //   window.setTimeout(() => {
      //     map.panTo(marker.getPosition());
      //   }, 3000);
      // });

      // $scope.marker.display = true;
      // uiGmapIsReady.promise()
      // .then(function (map_instances) {
      //   $scope.marker.display();
      // });

    //   $scope.$watch('map', function() {
    //     $scope.marker.setPosition(new google.maps.LatLng( $scope.fiveDayforecast.city.coord.lat, $scope.fiveDayforecast.city.coord.lon));
    // });

	  }).catch(function(err){
      $scope.fiveDayforecast = err.data;
      console.log(err+"ERROR..........")
    });
    };
    
    $scope.showMap = function(){
      
      $scope.map = {center: {latitude: $scope.fiveDayforecast.city.coord.lat, longitude: $scope.fiveDayforecast.city.coord.lon }, zoom: 6,control : {} };
      $scope.options = {scrollwheel: true};
  

    $scope.mapControlls = {};

      $scope.marker = {
        id: 0,
        coords: {
          latitude: $scope.fiveDayforecast.city.coord.lat,
          longitude: $scope.fiveDayforecast.city.coord.lon,
          title: $scope.fiveDayforecast.city.name
        }

      };
    }

  }
);
