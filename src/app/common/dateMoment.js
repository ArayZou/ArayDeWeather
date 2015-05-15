'use strict';

angular.module('arayDeWeather').factory('DateMoment', function() {
  return {
    getDateDay: function(date){
      var thisdate = new Date(date * 1000);
      return ('0' + (thisdate.getMonth() + 1)).slice(-2) + '/' + ('0' + thisdate.getDate()).slice(-2);
      weather3Hour.list[i].timeclock = ('0' + (timedate.getHours() + 1)).slice(-2) + ':' + ('0' + timedate.getMinutes()).slice(-2);
    },
    getDateClock: function(date){
      var thisdate = new Date(date * 1000);
      return ('0' + (thisdate.getHours() + 1)).slice(-2) + ':' + ('0' + thisdate.getMinutes()).slice(-2);
    },
    getWeekDay: function(date){
      var thisdate = new Date(date * 1000);
      var weekday = thisdate.getDay();
      switch(weekday){
        case 0:
          return '日';
        case 1:
          return '一';
        case 2:
          return '二';
        case 3:
          return '三';
        case 4:
          return '四';
        case 5:
          return '五';
        case 6:
          return '六';
      }
    }
  }
});
