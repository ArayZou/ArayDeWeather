angular.module('arayDeWeather').factory('WeatherIcon', function() {
  //console.log('MTCommonStorage');
  return function(codes){
    var weathermap = {
      '200' :	'wi-thunderstorm',   //thunderstorm with light rain
      '201' :	'wi-thunderstorm',   //thunderstorm with rain
      '202' :	'wi-thunderstorm',   //thunderstorm with heavy rain
      '210' :	'wi-thunderstorm',   //light thunderstorm
      '211' :	'wi-thunderstorm',   //thunderstorm
      '212' :	'wi-thunderstorm',   //heavy thunderstorm
      '221' :	'wi-thunderstorm',   //ragged thunderstorm
      '230' :	'wi-thunderstorm',   //thunderstorm with light drizzle
      '231' :	'wi-thunderstorm',   //thunderstorm with drizzle
      '232' :	'wi-thunderstorm',   //thunderstorm with heavy drizzle

      '300' :	'wi-showers',   //light intensity drizzle
      '301' :	'wi-showers',   //drizzle
      '302' :	'wi-showers',   //heavy intensity drizzle
      '310' :	'wi-showers',   //light intensity drizzle rain
      '311' :	'wi-showers',   //drizzle rain
      '312' :	'wi-showers',   //heavy intensity drizzle rain
      '313' :	'wi-showers',   //shower rain and drizzle
      '314' :	'wi-showers',   //heavy shower rain and drizzle
      '321' :	'wi-showers',   //shower drizzle

      '500' :	'wi-rain',   //light rain
      '501' :	'wi-rain',   //moderate rain
      '502' :	'wi-rain',   //heavy intensity rain
      '503' :	'wi-rain',   //very heavy rain
      '504' :	'wi-rain',   //extreme rain
      '511' :	'wi-rain',   //freezing rain
      '520' :	'wi-rain',   //light intensity shower rain
      '521' :	'wi-rain',   //shower rain
      '522' :	'wi-rain',   //heavy intensity shower rain
      '531' :	'wi-rain',   //ragged shower rain

      '600' :	'wi-snow',   //light snow
      '601' :	'wi-snow',   //snow
      '602' :	'wi-snow',   //heavy snow
      '611' :	'wi-snow',   //sleet
      '612' :	'wi-snow',   //shower sleet
      '615' :	'wi-snow',   //light rain and snow
      '616' :	'wi-snow',   //rain and snow
      '620' :	'wi-snow',   //light shower snow
      '621' :	'wi-snow',   //shower snow
      '622' :	'wi-snow',   //heavy shower snow

      '701' :	'wi-smoke',   //mist
      '711' :	'wi-smoke',   //smoke
      '721' :	'wi-day-haze',   //haze
      '731' :	'wi-dust',   //sand, dust whirls
      '741' :	'wi-fog',   //fog
      '751' :	'wi-smoke',   //sand
      '761' :	'wi-dust',   //dust
      '762' :	'wi-smoke',   //volcanic ash
      '771' :	'wi-smoke',   //squalls
      '781' :	'wi-tornado',   //tornado

      '800' :	'wi-day-sunny',   //clear sky
      '801' :	'wi-cloud',   //few clouds
      '802' :	'wi-cloudy',   //scattered clouds
      '803' :	'wi-cloudy-gusts',   //broken clouds
      '804' :	'wi-day-cloudy',   //overcast clouds

      '900' :	'wi-tornado',   //tornado
      '901' :	'wi-thunderstorm',   //tropical storm
      '902' :	'wi-hurricane',   //hurricane
      '903' :	'wi-snowflake-cold',   //cold
      '904' :	'wi-hot',   //hot
      '905' :	'wi-windy',   //windy
      '906' :	'wi-hail',   //hail
      '951' :	'wi-day-sunny',   //calm
      '952' :	'wi-windy',   //light breeze
      '953' :	'wi-windy',   //gentle breeze
      '954' :	'wi-windy',   //moderate breeze
      '955' :	'wi-wind',   //fresh breeze
      '956' :	'wi-wind',   //strong breeze
      '957' :	'wi-wind',   //high wind, near gale
      '958' :	'wi-strong-wind',   //gale
      '959' :	'wi-strong-wind',   //severe gale
      '960' :	'wi-thunderstorm',   //storm
      '961' :	'wi-thunderstorm',   //violent storm
      '962' :	'wi-hurricane'    //hurricane
    }
    return weathermap[codes] || 'wi-refresh';
  }
});
