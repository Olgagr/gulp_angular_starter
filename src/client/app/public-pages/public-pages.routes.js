function routerConfig($stateProvider, $urlRouterProvider) {
  'ngInject';

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'src/client/app/public-pages/home/home.html',
      controller: 'HomeController',
      controllerAs: 'vm'
    });

  $urlRouterProvider.otherwise('/');
}

export default routerConfig;