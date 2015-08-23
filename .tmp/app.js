(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
function config($logProvider, $locationProvider) {
  'ngInject';

  $logProvider.debugEnabled(true);
  $locationProvider.html5Mode(true);
}

exports['default'] = config;
module.exports = exports['default'];

},{}],2:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _appConfigJs = require('./app.config.js');

var _appConfigJs2 = _interopRequireDefault(_appConfigJs);

var _publicPagesPublicPagesModule = require('./public-pages/public-pages.module');

var _publicPagesPublicPagesModule2 = _interopRequireDefault(_publicPagesPublicPagesModule);

angular.module('app', ['ui.router', 'app.publicPages']).config(_appConfigJs2['default']);

},{"./app.config.js":1,"./public-pages/public-pages.module":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var HomeController = function HomeController() {
  'ngInject';

  _classCallCheck(this, HomeController);

  this.welcome = 'Welcome in new project!';
};

exports['default'] = HomeController;
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _publicPagesRoutes = require('./public-pages.routes');

var _publicPagesRoutes2 = _interopRequireDefault(_publicPagesRoutes);

var _homeHomeController = require('./home/home.controller');

var _homeHomeController2 = _interopRequireDefault(_homeHomeController);

angular.module('app.publicPages', []).controller('HomeController', _homeHomeController2['default']).config(_publicPagesRoutes2['default']);

},{"./home/home.controller":3,"./public-pages.routes":5}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
function routerConfig($stateProvider, $urlRouterProvider) {
  'ngInject';

  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'src/client/app/public-pages/home/home.html',
    controller: 'HomeController',
    controllerAs: 'vm'
  });

  $urlRouterProvider.otherwise('/');
}

exports['default'] = routerConfig;
module.exports = exports['default'];

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYXBwbGUvRG9jdW1lbnRzL215X3Byb2plY3RzL2d1bHBfYW5ndWxhcl9zdGFydGVyL3NyYy9jbGllbnQvYXBwL2FwcC5jb25maWcuanMiLCIvVXNlcnMvYXBwbGUvRG9jdW1lbnRzL215X3Byb2plY3RzL2d1bHBfYW5ndWxhcl9zdGFydGVyL3NyYy9jbGllbnQvYXBwL2FwcC5tb2R1bGUuanMiLCIvVXNlcnMvYXBwbGUvRG9jdW1lbnRzL215X3Byb2plY3RzL2d1bHBfYW5ndWxhcl9zdGFydGVyL3NyYy9jbGllbnQvYXBwL3B1YmxpYy1wYWdlcy9ob21lL2hvbWUuY29udHJvbGxlci5qcyIsIi9Vc2Vycy9hcHBsZS9Eb2N1bWVudHMvbXlfcHJvamVjdHMvZ3VscF9hbmd1bGFyX3N0YXJ0ZXIvc3JjL2NsaWVudC9hcHAvcHVibGljLXBhZ2VzL3B1YmxpYy1wYWdlcy5tb2R1bGUuanMiLCIvVXNlcnMvYXBwbGUvRG9jdW1lbnRzL215X3Byb2plY3RzL2d1bHBfYW5ndWxhcl9zdGFydGVyL3NyYy9jbGllbnQvYXBwL3B1YmxpYy1wYWdlcy9wdWJsaWMtcGFnZXMucm91dGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUNBQSxTQUFTLE1BQU0sQ0FBQyxZQUFZLEVBQUUsaUJBQWlCLEVBQUU7QUFDL0MsWUFBVSxDQUFDOztBQUVYLGNBQVksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEMsbUJBQWlCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ25DOztxQkFFYyxNQUFNOzs7Ozs7OzsyQkNQRixpQkFBaUI7Ozs7NENBQ1osb0NBQW9DOzs7O0FBRTVELE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQ3BCLFdBQVcsRUFDWCxpQkFBaUIsQ0FDbEIsQ0FBQyxDQUFDLE1BQU0sMEJBQVEsQ0FBQzs7Ozs7Ozs7Ozs7SUNOWixjQUFjLEdBRVAsU0FGUCxjQUFjLEdBRUo7QUFDWixZQUFVLENBQUM7O3dCQUhULGNBQWM7O0FBS2hCLE1BQUksQ0FBQyxPQUFPLEdBQUcseUJBQXlCLENBQUM7Q0FDMUM7O3FCQUdZLGNBQWM7Ozs7Ozs7O2lDQ1RKLHVCQUF1Qjs7OztrQ0FDckIsd0JBQXdCOzs7O0FBRW5ELE9BQU8sQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLENBQ2xDLFVBQVUsQ0FBQyxnQkFBZ0Isa0NBQWlCLENBQzVDLE1BQU0sZ0NBQWMsQ0FBQzs7Ozs7Ozs7QUNMeEIsU0FBUyxZQUFZLENBQUMsY0FBYyxFQUFFLGtCQUFrQixFQUFFO0FBQ3hELFlBQVUsQ0FBQzs7QUFFWCxnQkFBYyxDQUNYLEtBQUssQ0FBQyxNQUFNLEVBQUU7QUFDYixPQUFHLEVBQUUsR0FBRztBQUNSLGVBQVcsRUFBRSw0Q0FBNEM7QUFDekQsY0FBVSxFQUFFLGdCQUFnQjtBQUM1QixnQkFBWSxFQUFFLElBQUk7R0FDbkIsQ0FBQyxDQUFDOztBQUVMLG9CQUFrQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUNuQzs7cUJBRWMsWUFBWSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJmdW5jdGlvbiBjb25maWcoJGxvZ1Byb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlcikge1xuICAnbmdJbmplY3QnO1xuXG4gICRsb2dQcm92aWRlci5kZWJ1Z0VuYWJsZWQodHJ1ZSk7XG4gICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh0cnVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29uZmlnOyIsImltcG9ydCBjb25maWcgZnJvbSAnLi9hcHAuY29uZmlnLmpzJztcbmltcG9ydCBwdWJsaWNQYWdlcyBmcm9tICcuL3B1YmxpYy1wYWdlcy9wdWJsaWMtcGFnZXMubW9kdWxlJztcblxuYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFtcbiAgJ3VpLnJvdXRlcicsXG4gICdhcHAucHVibGljUGFnZXMnXG5dKS5jb25maWcoY29uZmlnKTsiLCJjbGFzcyBIb21lQ29udHJvbGxlciB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHRoaXMud2VsY29tZSA9ICdXZWxjb21lIGluIG5ldyBwcm9qZWN0ISc7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSG9tZUNvbnRyb2xsZXI7IiwiaW1wb3J0IHJvdXRlckNvbmZpZyBmcm9tICcuL3B1YmxpYy1wYWdlcy5yb3V0ZXMnO1xuaW1wb3J0IEhvbWVDb250cm9sbGVyIGZyb20gJy4vaG9tZS9ob21lLmNvbnRyb2xsZXInO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwLnB1YmxpY1BhZ2VzJywgW10pXG4gIC5jb250cm9sbGVyKCdIb21lQ29udHJvbGxlcicsIEhvbWVDb250cm9sbGVyKVxuICAuY29uZmlnKHJvdXRlckNvbmZpZyk7IiwiZnVuY3Rpb24gcm91dGVyQ29uZmlnKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcbiAgJ25nSW5qZWN0JztcblxuICAkc3RhdGVQcm92aWRlclxuICAgIC5zdGF0ZSgnaG9tZScsIHtcbiAgICAgIHVybDogJy8nLFxuICAgICAgdGVtcGxhdGVVcmw6ICdzcmMvY2xpZW50L2FwcC9wdWJsaWMtcGFnZXMvaG9tZS9ob21lLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ0hvbWVDb250cm9sbGVyJyxcbiAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJ1xuICAgIH0pO1xuXG4gICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgcm91dGVyQ29uZmlnOyJdfQ==
