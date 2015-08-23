import config from './app.config.js';
import publicPages from './public-pages/public-pages.module';

angular.module('app', [
  'ui.router',
  'app.publicPages'
]).config(config);