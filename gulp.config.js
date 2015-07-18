module.exports = function() {

  var src = './src/',
      tmp = './.tmp',
      app = src + 'app/';

  var config = {

    tmp: tmp,

    src: src,

    index: src + 'index.html',

    // all js for vet
    alljs : [
      './src/**/*.js',
      './*.js'
    ],

    js: [
      app + '**/*.module.js',
      app + '**/*.js',
      '!' + app + '**/*.spec.js'
    ],

    scss: [
      src + 'assets/styles/**/*.scss'
    ],

    bower: {
      json: require('./bower.json'),
      directory: './bower_components',
      ignorePath: '../..'
    }
  };

  config.getWiredepDefaultOptions = function getWiredepDefaultOptions() {
    var options = {
      bowerJson: config.bower.json,
      directory: config.bower.directory,
      ignorePath: config.bower.ignorePath
    };

    return options;
  };

  return config;

};