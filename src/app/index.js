'use strict';

angular.module('arayDeWeather', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ui.router','ng-iscroll'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });

    $urlRouterProvider.otherwise('/');
  })
;
