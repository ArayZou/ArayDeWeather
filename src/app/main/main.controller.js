'use strict';

angular.module('arayDeWeather')
  .controller('MainCtrl', function ($scope,$http,$window,WeatherIcon,WeatherWindDeg,WeatherWindLevel) {
    $scope.showloading = true;

    getLocation();

    //定位
    function getLocation(){
      if ($window.navigator.geolocation) {
        console.log('geolocation');
        $window.navigator.geolocation.getCurrentPosition(showPosition);
      } else{
        console.log('geolocation error');
      }
    }

    function showPosition(position) {
      var lat = position.coords.latitude,
          lon = position.coords.longitude;
      console.log('lat:'+lat);
      console.log('lon:'+lon);
      //地理数据
      $http
        .jsonp('http://api.map.baidu.com/geocoder/v2/?ak=izzcWKDNO77b3VodC1ipezPh&callback=JSON_CALLBACK&location='+lat+','+lon+'&output=json&pois=1')
        .success(function(location){
          console.log(location);
          $scope.location = location.result;
        });

      //当天天气数据
      $http({
        url: 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&lang=zh_cn&APPID=ed158d368307ef2644fe349ffa6a50d4'
      }).success(function(weather){
        if(weather.cod===200){
          console.log(weather);
          $scope.weather = weather;
          //计算风向
          weather.wind.deg = WeatherWindDeg(weather.wind.deg);
          //计算风力
          weather.wind.windinfo = WeatherWindLevel(weather.wind.speed);
          //天气icon转换
          weather.weather[0].id = WeatherIcon(weather.weather[0].id);
          $scope.showloading = false;
        }
      });

      //5天每3小时天气数据
      $http({
        url: 'http://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&lang=zh_cn&APPID=ed158d368307ef2644fe349ffa6a50d4'
      }).success(function(weather3Hour){
        if(weather3Hour.cod==='200') {
          console.log(weather3Hour);
          $scope.weather3Hour = weather3Hour;
        }
      });

      //10天天气预报数据
      $http({
        url: 'http://api.openweathermap.org/data/2.5/forecast/daily?lat='+lat+'&lon='+lon+'&lang=zh_cn&cnt=10&mode=json&APPID=ed158d368307ef2644fe349ffa6a50d4'
      }).success(function(weather10Day){
        if(weather10Day.cod==='200') {
          console.log(weather10Day);
          $scope.weather10Day = weather10Day;
        }
      });
    }

    //$scope.awesomeThings = [
    //  {
    //    'title': 'AngularJS',
    //    'url': 'https://angularjs.org/',
    //    'description': 'HTML enhanced for web apps!',
    //    'logo': 'angular.png'
    //  },
    //  {
    //    'title': 'BrowserSync',
    //    'url': 'http://browsersync.io/',
    //    'description': 'Time-saving synchronised browser testing.',
    //    'logo': 'browsersync.png'
    //  },
    //  {
    //    'title': 'GulpJS',
    //    'url': 'http://gulpjs.com/',
    //    'description': 'The streaming build system.',
    //    'logo': 'gulp.png'
    //  },
    //  {
    //    'title': 'Jasmine',
    //    'url': 'http://jasmine.github.io/',
    //    'description': 'Behavior-Driven JavaScript.',
    //    'logo': 'jasmine.png'
    //  },
    //  {
    //    'title': 'Karma',
    //    'url': 'http://karma-runner.github.io/',
    //    'description': 'Spectacular Test Runner for JavaScript.',
    //    'logo': 'karma.png'
    //  },
    //  {
    //    'title': 'Protractor',
    //    'url': 'https://github.com/angular/protractor',
    //    'description': 'End to end test framework for AngularJS applications built on top of WebDriverJS.',
    //    'logo': 'protractor.png'
    //  },
    //  {
    //    'title': 'Bootstrap',
    //    'url': 'http://getbootstrap.com/',
    //    'description': 'Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.',
    //    'logo': 'bootstrap.png'
    //  },
    //  {
    //    'title': 'Angular UI Bootstrap',
    //    'url': 'http://angular-ui.github.io/bootstrap/',
    //    'description': 'Bootstrap components written in pure AngularJS by the AngularUI Team.',
    //    'logo': 'ui-bootstrap.png'
    //  },
    //  {
    //    'title': 'Sass (Node)',
    //    'url': 'https://github.com/sass/node-sass',
    //    'description': 'Node.js binding to libsass, the C version of the popular stylesheet preprocessor, Sass.',
    //    'logo': 'node-sass.png'
    //  }
    //];
    //angular.forEach($scope.awesomeThings, function(awesomeThing) {
    //  awesomeThing.rank = Math.random();
    //});
  });
