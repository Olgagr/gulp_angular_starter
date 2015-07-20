var app = angular.module('app', []);

app.directive('someDir', [function() {
  return {
    restrict: 'E',
    templateUrl: 'some-dir.html',
    link: function() {
    }
  };
}]);