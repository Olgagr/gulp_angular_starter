module.exports = function() {

  var client = './src/client/',
      tmp = './.tmp/',
      clientApp = client + 'app/',
      server = './src/server/',
      build = './build/',
      assets = client + 'assets/',
      buildAssets = build + 'assets/',
      root = './',
      report = './report/',
      wiredep = require('wiredep'),
      bowerFiles = wiredep({devDependencies: true})['js'],
      specRunnerFile = 'specs.html';

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
    report: report,

    // js: [
    //   clientApp + '**/*.module.js',
    //   clientApp + '**/*.js',
    //   '!' + clientApp + '**/*.spec.js'
    // ],

    scss: [
      client + 'assets/styles/**/*.scss'
    ],
    server: server,
    root: root,

    css: tmp + '**/*.css',

    jsES6: [
      clientApp + '**/*.module.js',
      clientApp + '**/*.js',
      '!' + clientApp + '**/*.spec.js'
    ],

    // main ES6 module
    jsES6MailFile: client + 'app/app.js',

    // name of compiled ES5 file
    jsES5DestFileName: 'app.js',

    js: [
      tmp + '**/*.js',
      '!' + tmp + 'templates.js'
    ],

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

    packages: [
      './package.json',
      './bower.json'
    ],

    // node settings
    defaultPort: 7203,
    nodeServer: server + 'app.js',

    //specs.html, our HTML spec runner
    specRunner: client + specRunnerFile,
    specRunnerFile: specRunnerFile,
    testlibraries: [
      'node_modules/mocha/mocha.js',
      'node_modules/chai/chai.js',
      'node_modules/mocha-clean/index.js',
      'node_modules/sinon-chai/lib/sinon-chai.js'
    ],

    // karma and testing
    specHelpers: [client + 'test-helpers/*.js'],
    specs: [clientApp + '**/*.spec.js'],
    serverIntegrationSpecs: [] // any integration tests here,
  };

  config.getWiredepDefaultOptions = function getWiredepDefaultOptions() {
    var options = {
      bowerJson: config.bower.json,
      directory: config.bower.directory,
      ignorePath: config.bower.ignorePath
    };

    return options;
  };

  config.karma = getKarmaOptions();

  return config;

  /////////////

  function getKarmaOptions() {
    var options = {
      files: [].concat(
        bowerFiles,
        config.specHelpers,
        config.js,
        tmp + config.templateCache.file,
        config.specs,
        config.serverIntegrationSpecs
      ),
      exclude: [],
      coverage: {
        dir: report + 'coverage',
        reporters: [
          {type: 'html', subdir: 'report-html'},
          {type: 'lcov', subdir: 'report-lcov'},
          {type: 'text-summary'}
        ]
      },
      preprocessors: {}
    };

    options.preprocessors[clientApp + '**/!(*.spec)*(.js)'] = ['coverage'];

    return options;
  }

};