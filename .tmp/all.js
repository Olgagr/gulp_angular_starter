'use strict';

var app = angular.module('app', []);

app.directive('someDir', [function () {
  return {
    restrict: 'E',
    templateUrl: 'some-dir.html',
    link: function link() {
      var test = 'test';
      console.log('hello test');
    }
  };
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDOztBQUVwQyxHQUFHLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFDLFlBQVc7QUFDbkMsU0FBTztBQUNMLFlBQVEsRUFBRSxHQUFHO0FBQ2IsZUFBVyxFQUFFLGVBQWU7QUFDNUIsUUFBSSxFQUFFLGdCQUFXO0FBQ2YsVUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDO0FBQ2xCLGFBQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDM0I7R0FDRixDQUFDO0NBQ0gsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoiYWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbXSk7XG5cbmFwcC5kaXJlY3RpdmUoJ3NvbWVEaXInLCBbZnVuY3Rpb24oKSB7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdFJyxcbiAgICB0ZW1wbGF0ZVVybDogJ3NvbWUtZGlyLmh0bWwnLFxuICAgIGxpbms6IGZ1bmN0aW9uKCkge1xuICAgICAgbGV0IHRlc3QgPSAndGVzdCc7XG4gICAgICBjb25zb2xlLmxvZygnaGVsbG8gdGVzdCcpO1xuICAgIH1cbiAgfTtcbn1dKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=