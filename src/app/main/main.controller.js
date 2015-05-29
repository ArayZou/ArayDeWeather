'use strict';

angular.module('arayDeWeather')
  .controller('MainCtrl', function ($scope,$http,$window,$state,WeatherIcon,WeatherWindDeg,WeatherWindLevel,DateMoment) {
    $scope.installed = false;
    $scope.webopen = false;
    // 判断是否加入桌面
    if(navigator.standalone){
      $scope.installed = true;
    }
    //安卓跳过判断
    if (/android/.test(navigator.userAgent.toLowerCase())) {
      $scope.webopen = true;
      getLocation();
    }
    $scope.openbyweb = function(){
      $scope.webopen = true;
      getLocation();
    };

    $scope.showloading = true;
    $scope.showWeather = false;
    $scope.ifIos = true;
    $scope.weatherDateComplete = false;
    $scope.weather3HourDateComplete = false;
    $scope.forecastByDayDateComplete = false;
    $scope.weather = {};
    $scope.weather3Hour = {};
    $scope.forecastByDay = {};
    //H5定位
    function getLocation(){
      if ($window.navigator.geolocation) {
        console.log('geolocation');
        $window.navigator.geolocation.getCurrentPosition(showPosition);
      } else{
        console.log('geolocation error');
      }
    }
    //定位成功获取当地数据
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

      httpCurrentWeather(lat,lon);
      httpForecast3hour(lat,lon);
      httpForecast16day(lat,lon);
    }


    //当天天气数据
    function httpCurrentWeather(lat,lon){
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
          //日出日落转换
          weather.sys.sunrise = DateMoment.getDateClock(weather.sys.sunrise);
          weather.sys.sunset = DateMoment.getDateClock(weather.sys.sunset);
          //数据处理完成
          $scope.weatherDateComplete = true;
          checkDateComplete();
        }
      }).error(function(){
        httpCurrentWeather(lat,lon)
      });
    }

    //5天每3小时天气数据
    function httpForecast3hour(lat,lon){
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
          //数据处理完成
          $scope.weather3HourDateComplete = true;
          checkDateComplete();
        }
      }).error(function () {
        httpForecast3hour(lat,lon)
      });
    }

    //16天天气预报数据
    function httpForecast16day(lat,lon) {
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
              spacingBottom: 0,
              backgroundColor: '#1F8A70',
              borderColor: '#fff'
            },
            title: null,
            subtitle: null,
            xAxis: {
              categories: dateArray,
              labels: {
                useHTML: true
              },
              lineColor: '#fff'
            },
            yAxis: {
              showEmpty: true,
              labels: {
                enabled: false
              },
              title: {
                text: null
              },
              lineColor: '#fff'
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
              data: maxArray,
              color:'#fff',
              dataLabels: {
                enabled: true,
                color: '#fff'
              }
            }, {
              name: 'min',
              data: minArray,
              color:'#fff',
              dataLabels: {
                enabled: true,
                color: '#fff'
              }
            }]
          };
          $scope.basicAreaChart = chartdata;
          //数据处理完成
          $scope.forecastByDayDateComplete = true;
          checkDateComplete();
        }
      }).error(function () {
        httpForecast16day(lat,lon);
      });
    }

    // 检查参数完整显示页面
    function checkDateComplete(){
      if($scope.weatherDateComplete && $scope.weather3HourDateComplete && $scope.forecastByDayDateComplete){
        //渲染内容
        $scope.showloading = false;
        //显示内容
        setTimeout(function(){
          $scope.showWeather = true;
          $scope.ifRefresh = false;
          $scope.showMaskLoadding = false;
          $scope.$digest();
        },2100);
      }
    }
    // 初始化数据
    if($scope.installed || $scope.webopen){
      getLocation();
    }
    // 下拉刷新
    $scope.ifRefresh = false;
    $scope.ifShowRefresh = false;
    $scope.showMaskLoadding = false;
    $scope.pullLength = 0;
    $scope.$parent.myScrollOptions = {
      'weather_main': {
        snap:false,
        probeType: 2,
        momentum: true,
        click:true,
        startY:0,
        deceleration:0.0005,
        on: [
          { beforeScrollStart: function () {
          }},
          { scrollEnd: function () {
            if($scope.ifRefresh && this.directionY === -1){
              $scope.showMaskLoadding = true;
              $scope.weatherDateComplete = false;
              $scope.weather3HourDateComplete = false;
              $scope.forecastByDayDateComplete = false;
              getLocation();
              //$scope.ifRefresh = false;
            }
          }},
          { scroll: function () {
            var that = this;
            if(!$scope.ifRefresh && this.y>80){
              $scope.ifRefresh = true;
              that.deceleration = 0.005;
            }
            $scope.pullLength = this.y;
            $scope.$digest();
          }}
        ]
      },
      'per3hour': {
        snap:false,
        scrollX: true,
        scrollY: false,
        mouseWheel: true,
        preventDefault: true
      }
    };

    //snap配置项
    $scope.snapOpts = {
      disable: 'right',
      touchToDrag: false
    };

  });
