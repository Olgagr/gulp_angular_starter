module.exports = function() {

  var client = './src/client/',
      tmp = './.tmp',
      clientApp = client + 'app/';

  var config = {

    tmp: tmp,

    client: client,

    index: client + 'index.html',

    // all js for vet
    alljs : [
      './src/**/*.js',
      './*.js'
    ],

    js: [
      clientApp + '**/*.module.js',
      clientApp + '**/*.js',
      '!' + clientApp + '**/*.spec.js'
    ],

    scss: [
      client + 'assets/styles/**/*.scss'
    ],

    css: tmp + '**/*.css',

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