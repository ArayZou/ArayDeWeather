'use strict';

angular.module('arayDeWeather').factory('WeatherWindDeg', function() {
  return function(deg){
    //计算风向
    switch(true){
      case (deg>=0 && deg < 22.5):
        return '北';
      case (deg>=22.5 && deg < 67.5):
        return '东北';
      case (deg>=67.5 && deg < 112.5):
        return '东';
      case (deg>=112.5 && deg < 157.5):
        return '东南';
      case (deg>=157.5 && deg < 202.5):
        return '南';
      case (deg>=202.5 && deg < 247.5):
        return '西南';
      case (deg>=247.5 && deg < 292.5):
        return '西';
      case (deg>=292.5 && deg < 337.5):
        return '西北';
      case (deg>=337.5 && deg <= 360):
        return '北';
    };
  }
});
