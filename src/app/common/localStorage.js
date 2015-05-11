angular.module('arayDeWeather').factory('MTCommonStorage', function($window) {
    //console.log('MTCommonStorage');
    return {
        SetLocalStorage : function(storage,dataobj,time){
            var saveDate = new Date();
            var deadTime = saveDate.valueOf();
            var dateNum = time.substring(0,time.length-1);
            if(/^[0-9]*$/.test(dateNum)){
                switch(time.substr(-1)){
                    case 'd'||'D':
                        deadTime = deadTime + dateNum*24*60*60*1000;
                        break;
                    case 'h'||'H':
                        deadTime = deadTime + dateNum*60*60*1000;
                        break;
                    case 'm'||'M':
                        deadTime = deadTime + dateNum*60*1000;
                        break;
                    case 's'||'S':
                        deadTime = deadTime + dateNum*1000;
                        break;
                    default:
                        console.log('时间单位必须为D,H,M,S');
                        return false;
                        break;
                }
                var deadTime = new Date(deadTime);
                var data = {
                    Value : dataobj,
                    DeadTime : deadTime,
                    SaveTime : saveDate
                };
                $window.localStorage.setItem("USER", angular.toJson(data));
            }else{
                console.log('时间格式错误');
            }
        },
        GetLocalStorage: function(storage){
            var thisStorage = angular.fromJson($window.localStorage.getItem(storage));
            if(thisStorage){
                var date = new Date();
                var deadTime = new Date(thisStorage.DeadTime);
                if(date<deadTime){
                    return thisStorage.Value;
                }else{
                    $window.localStorage.removeItem(storage);
                }
            }
        }
    }
});
