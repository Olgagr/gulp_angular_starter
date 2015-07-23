module.exports = function() {

  var client = './src/client/',
      tmp = './.tmp/',
      clientApp = client + 'app/',
      server = './src/server/',
      build = './build/',
      assets = client + 'assets/',
      buildAssets = build + 'assets/';

  var config = {

    tmp: tmp,

    client: client,

    index: client + 'index.html',

    // all js for vet
    alljs : [
      './src/**/*.js',
      './*.js'
    ],
    htmltemplates: clientApp + '**/*.html',

    build: build,
    buildAssets: buildAssets,
    images: assets + 'images/**/*.*',
    fonts: [assets + 'fonts/**/*.*'],
    html: clientApp + '**/*.html',

    js: [
      clientApp + '**/*.module.js',
      clientApp + '**/*.js',
      '!' + clientApp + '**/*.spec.js'
    ],

    scss: [
      client + 'assets/styles/**/*.scss'
    ],
    server: server,

    css: tmp + '**/*.css',

    // optimized files
    optimized: {
      lib: 'lib.js',
      app: 'app.js'
    },

    // template cache
    templateCache: {
      file: 'templates.js',
      options: {
        module: 'app',
        standAlone: false,
        root: 'app/'
      }
    },

    // browser sync
    browserReloadDelay: 1000,

    // bower
    bower: {
      json: require('./bower.json'),
      directory: './bower_components',
      ignorePath: '../..'
    },

    // node settings
    defaultPort: 7203,
    nodeServer: server + 'app.js'
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