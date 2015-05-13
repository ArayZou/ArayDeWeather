'use strict';

angular.module('arayDeWeather').factory('WeatherWindLevel', function() {
  return function(wind){
    //计算风向
    switch(true){
      case (wind>=0 && wind < 0.2):
        return {
          level:'无风',
          windname: '无风',
          windintro: '静，烟直上'
        };
      case (wind>=0.2 && wind <1.5 ):
        return {
          level:'一级',
          windname: '软风',
          windintro: '烟能表示风向，但风向标不能转动'
        };
      case (wind>=1.5 && wind <3.3 ):
        return {
          level:'二级',
          windname: '轻风',
          windintro: '人面感觉有风，树叶有微响，风向标能转动'
        };
      case (wind>=3.3 && wind <5.4 ):
        return {
          level:'三级',
          windname: '微风',
          windintro: '树叶及微枝摆动不息，旗帜展开'
        };
      case (wind>=5.4 && wind <7.9 ):
        return {
          level:'四级',
          windname: '和风',
          windintro: '能吹起地面灰尘和纸张，树的小枝微动'
        };
      case (wind>=7.9 && wind <10.7 ):
        return {
          level:'五级',
          windname: '清劲风',
          windintro: '有叶的小树枝摇摆，内陆水面有小波'
        };
      case (wind>=10.7 && wind <13.8 ):
        return {
          level:'六级',
          windname: '强风',
          windintro: '大树枝摆动，电线呼呼有声，举伞困难'
        };
      case (wind>=13.8 && wind <17.1 ):
        return {
          level:'七级',
          windname: '疾风',
          windintro: '全树摇动，迎风步行感觉不便'
        };
      case (wind>=17.1 && wind <20.7 ):
        return {
          level:'八级',
          windname: '大风',
          windintro: '微枝折毁，人向前行感觉阻力甚大'
        };
      case (wind>=20.7 && wind <24.4 ):
        return {
          level:'九级',
          windname: '烈风',
          windintro: '建筑物有损坏（烟囱顶部及屋顶瓦片移动）'
        };
      case (wind>=24.4 && wind <28.4 ):
        return {
          level:'十级',
          windname: '狂风',
          windintro: '陆上少见，见时可使树木拔起将建筑物损坏严重'
        };
      case (wind>=28.4 && wind <32.6 ):
        return {
          level:'十一级',
          windname: '暴风',
          windintro: '陆上很少，有则必有重大损毁'
        };
      case (wind>=32.6 && wind <36.9 ):
        return {
          level:'十二级',
          windname: '飓风',
          windintro: '陆上绝少，其摧毁力极大'
        };
      case (wind>=36.9 && wind <41.4 ):
        return {
          level:'十三级',
          windname: '飓风',
          windintro: '陆上绝少，其摧毁力极大'
        };
      case (wind>=41.4 && wind <46.1 ):
        return {
          level:'十四级',
          windname: '飓风',
          windintro: '陆上绝少，其摧毁力极大'
        };
      case (wind>=46.1 && wind <50.9 ):
        return {
          level:'十五级',
          windname: '飓风',
          windintro: '陆上绝少，其摧毁力极大'
        };
      case (wind>=50.9 && wind <56 ):
        return {
          level:'十六级',
          windname: '飓风',
          windintro: '陆上绝少，其摧毁力极大'
        };
      case (wind>=56):
        return {
          level:'十七级',
          windname: '飓风',
          windintro: '陆上绝少，其摧毁力极大'
        };
    };
  }
});
