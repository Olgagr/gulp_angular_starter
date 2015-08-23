import routerConfig from './public-pages.routes';
import HomeController from './home/home.controller';

angular.module('app.publicPages', [])
  .controller('HomeController', HomeController)
  .config(routerConfig);