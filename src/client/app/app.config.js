function config($logProvider, $locationProvider) {
  'ngInject';

  $logProvider.debugEnabled(true);
  $locationProvider.html5Mode(true);
}

export default config;