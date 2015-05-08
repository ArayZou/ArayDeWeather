'use strict';

angular.module('arayDeWeather')
  .controller('NavbarCtrl', function ($scope) {
    $scope.date = new Date();
  });
