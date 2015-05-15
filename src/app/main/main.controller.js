'use strict';

angular.module('arayDeWeather')
  .controller('MainCtrl', function ($scope,$http,$window,$state,WeatherIcon,WeatherWindDeg,WeatherWindLevel,DateMoment) {
    $scope.showloading = true;
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
      $http.jsonp('http://api.map.baidu.com/geocoder/v2/?ak=izzcWKDNO77b3VodC1ipezPh&callback=JSON_CALLBACK&location='+lat+','+lon+'&output=json&pois=1').success(function(location){
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
          weather.weather[0].icon = WeatherIcon(weather.weather[0].id);

          //5天每3小时天气数据
          $http({
            url: 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&lang=zh_cn&APPID=ed158d368307ef2644fe349ffa6a50d4'
          }).success(function (weather3Hour) {
            if (weather3Hour.cod === '200') {
              for (var i = 0; i < weather3Hour.list.length; i++) {
                var thisdate = weather3Hour.list[i].dt;
                weather3Hour.list[i].timedate = DateMoment.getDateDay(thisdate);
                weather3Hour.list[i].timeclock = DateMoment.getDateClock(thisdate);
                weather3Hour.list[i].weekday = DateMoment.getWeekDay(thisdate);
                weather3Hour.list[i].weather[0].icon = WeatherIcon(weather3Hour.list[i].weather[0].id);
              }

              console.log(weather3Hour);
              $scope.weather3Hour = weather3Hour;

              //16天天气预报数据
              $http({
                url: 'http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + lat + '&lon=' + lon + '&lang=zh_cn&cnt=16&mode=json&APPID=ed158d368307ef2644fe349ffa6a50d4'
              }).success(function (forecastByDay) {
                if (forecastByDay.cod === '200') {
                  console.log(forecastByDay);
                  $scope.forecastByDay = forecastByDay;

                  var dateArray = [],
                    maxArray = [],
                    minArray = [];
                  $scope.forecastByDayPart1 = [];
                  $scope.forecastByDayPart2 = [];
                  for (var i = 0; i < 15; i++) {
                    if (forecastByDay.list[i]) {
                      var thisdate = forecastByDay.list[i].dt;
                      forecastByDay.list[i].timedate = DateMoment.getDateDay(thisdate);
                      forecastByDay.list[i].weekday = DateMoment.getWeekDay(thisdate);
                      forecastByDay.list[i].weather[0].icon = WeatherIcon(forecastByDay.list[i].weather[0].id);
                      if (i < 7) {
                        var dayDate = '<div class="chart_xlabels"><span>' + DateMoment.getDateDay(thisdate) + '</span><br>' +
                          '<span>周' + forecastByDay.list[i].weekday + '</span><br>' +
                          '<span class="wi ' + forecastByDay.list[i].weather[0].icon + '"></span><br>' +
                          '<span>' + forecastByDay.list[i].weather[0].description + '</span></div>';
                        dateArray.push(dayDate);
                        maxArray.push(parseInt(forecastByDay.list[i].temp.max - 273.15));
                        minArray.push(parseInt(forecastByDay.list[i].temp.min - 273.15));
                        $scope.forecastByDayPart1.push(forecastByDay.list[i]);
                      } else {
                        $scope.forecastByDayPart2.push(forecastByDay.list[i]);
                      }
                    }
                  }

                  var chartdata = {
                    chart: {
                      type: 'line',
                      spacingLeft: 0,
                      spacingRight: 0,
                      spacingTop: 0,
                      spacingBottom: 0
                    },
                    title: null,
                    subtitle: null,
                    xAxis: {
                      categories: dateArray,
                      labels: {
                        useHTML: true
                      }
                    },
                    yAxis: {
                      showEmpty: true,
                      labels: {
                        enabled: false
                      },
                      title: {
                        text: null
                      }
                    },
                    plotOptions: {
                      line: {
                        dataLabels: {
                          enabled: true
                        },
                        enableMouseTracking: false
                      }
                    },
                    series: [{
                      name: 'max',
                      data: maxArray
                    }, {
                      name: 'min',
                      data: minArray
                    }]
                  };
                  $scope.basicAreaChart = chartdata;

                  //显示内容
                  $scope.showloading = false;

                }
              }).error(function () {
                $state.reload();
              });
            }
          }).error(function () {
            $state.reload();
          });
        }
      }).error(function(){
        $state.reload();
      });
    }

    getLocation();

    $scope.$parent.myScrollOptions = {
      'weather_main': {
        snap:false,
        probeType:1,
        tap:true,
        click:false,
        //preventDefaultException:{tagName:/.*/},
        mouseWheel:true,
        scrollbars:true,
        fadeScrollbars:true,
        interactiveScrollbars:false,
        keyBindings:false,
        deceleration:0.0002,
        startY:0
      },
      'per3hour': {
        snap:false,
        scrollX: true,
        scrollY: false,
        mouseWheel: true,
        preventDefault: true
      }
    };

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
