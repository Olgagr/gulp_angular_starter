var gulp        = require('gulp'),
    args        = require('yargs').alias('v', 'verbose').argv,
    $           = require('gulp-load-plugins')({lazy:true}),
    del         = require('del'),
    wiredep     = require('wiredep').stream,
    config      = require('./gulp.config')(),
    browserSync = require('browser-sync'),
    babelify    = require('babelify'),
    browserify  = require('browserify'),
    source      = require('vinyl-source-stream'),
    port        = process.env.PORT || config.defaultPort;

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

gulp.task('vet', function() {

  log('Analyzing code with jshint and jscs');

  return gulp
    .src(config.alljs)
    .pipe($.if(args.verbose, $.print()))
    .pipe($.jscs())
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish', {varbose: true}))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('styles', ['clean-styles'], function() {

  log('Compiling SCSS --> CSS');

  return gulp
    .src(config.scss)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
      .pipe($.sass())
      .pipe($.autoprefixer())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(config.tmp));
});

gulp.task('scripts', function() {

  log('Compiling ES6 --> ES5');

  return browserify({
    entries: config.jsES6MailFile,
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source(config.jsES5DestFileName))
  .pipe(gulp.dest(config.tmp));

});

gulp.task('images', ['clean-images'], function() {

  log('Coping and compressing images');

  return gulp
    .src(config.images)
    .pipe($.imagemin({optimizationLevel: 4}))
    .pipe(gulp.dest(config.buildAssets + 'images'));
});

gulp.task('fonts', ['clean-fonts'], function() {

  log('Coping fonts');

  return gulp
    .src(config.fonts)
    .pipe(gulp.dest(config.buildAssets + 'fonts'));
});

gulp.task('clean', function(done) {
  var delConfig = [].concat(config.build, config.tmp);

  log('Cleaning: ' + delConfig);

  clean(delConfig, done);
});

gulp.task('clean-images', function(done) {
  clean(config.buildAssets + 'images', done);
});

gulp.task('clean-fonts', function(done) {
  clean(config.buildAssets + 'fonts', done);
});

gulp.task('clean-styles', function(done) {
  clean(config.css, done);
});

gulp.task('clean-scripts', function(done) {
  clean(config.js, done);
});

gulp.task('clean-code', function(done) {
  var files = [].concat(
    config.tmp + '**/*.js',
    config.build + '**/*.html',
    config.build + 'js/**/*.js'
  );
  clean(files, done);
});

gulp.task('styles-watch', function() {
  gulp.watch([config.scss], ['styles']);
});

gulp.task('scripts-watch', function() {
  gulp.watch([config.jsES6], ['scripts']);
});

gulp.task('templatecache', ['clean-code'], function() {
  return gulp
    .src(config.htmltemplates)
    .pipe($.minifyHtml({empty: true}))
    .pipe($.angularTemplatecache(
      config.templateCache.file,
      config.templateCache.options
    ))
    .pipe(gulp.dest(config.tmp));
});

gulp.task('wiredep', function() {

  log('Wire up the bower css, js into the html');

  var options = config.getWiredepDefaultOptions();
  return gulp
    .src(config.index)
    .pipe(wiredep(options))
    .pipe(gulp.dest(config.client));
});

gulp.task('inject', ['wiredep', 'styles', 'templatecache', 'scripts'], function() {

  log('Wire up the app css into the html and call wiredep');

  return gulp
    .src(config.index)
    .pipe($.inject(gulp.src(config.css)))
    .pipe($.inject(gulp.src(config.js)))
    .pipe(gulp.dest(config.client));
});

gulp.task('optimize', ['inject', 'test', 'images', 'fonts'], function() {

  var templateCache = config.tmp + config.templateCache.file,
      assets = $.useref.assets({searchPath: './'}),
      cssFilter = $.filter('**/*.css'),
      jsLibFilter = $.filter('**/' + config.optimized.lib),
      jsAppFilter = $.filter('**/' + config.optimized.app);

  log('Optimizing the javascript, css, html');

  return gulp
    .src(config.index)
    .pipe($.plumber())
    .pipe($.inject(gulp.src(templateCache, {read: false}),
      {starttag: '<!-- inject:templates:js -->'}))
    .pipe(assets)
    .pipe(cssFilter)
    .pipe($.csso())
    .pipe(cssFilter.restore())
    .pipe(jsLibFilter)
    .pipe($.uglify())
    .pipe(jsLibFilter.restore())
    .pipe(jsAppFilter)
    .pipe($.ngAnnotate())
    .pipe($.uglify())
    .pipe(jsAppFilter.restore())
    .pipe($.rev())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(gulp.dest(config.build))
    .pipe($.rev.manifest())
    .pipe(gulp.dest(config.build));
});

/**
* Bump version
* --type=prerelease will bump the prerelease version *.*.*-x
* --type=patch or no flag will bump the patch version *.*.x
* --type=minor will bump the minor version *.x.*
* --type=major will bump minor version x.*.*
* --version=1.2.3 will bump to specific version and ignore other flags
*/
gulp.task('bump', function() {
  var msg = 'Bumping version',
      type = args.type,
      version = args.version,
      options = {};

  if (version) {
    options.version = version;
    msg += ' to ' + version;
  } else {
    options.type = type;
    msg += ' for a ' + type;
  }

  log(msg);

  return gulp
    .src(config.packages)
    .pipe($.bump(options))
    .pipe(gulp.dest(config.root));
});

gulp.task('serve-build', ['optimize'], function() {
  serve(false);
});

gulp.task('serve-dev', ['inject'], function () {
  serve(true);
});

gulp.task('test', ['vet', 'templatecache', 'scripts'], function(done) {
  startTests(true /* single run */, done);
});

gulp.task('test:watch', ['vet', 'templatecache', 'scripts'], function(done) {
  startTests(false, done);
});

//////

function serve(isDev) {
  var nodeOptions = {
    script: config.nodeServer,
    delayTime: 1,
    env: {
      'PORT': port,
      'NODE_ENV': isDev ? 'dev' : 'build'
    },
    watch: [config.server]
  };

  return $.nodemon(nodeOptions)
    .on('restart', ['vet'], function(ev) {
      log('*** nodemon restarted');
      log('files changed on restart:\n' + ev);
      setTimeout(function() {
        browserSync.notify('reloading now...');
        browserSync.reload({stream: false});
      }, config.browserReloadDelay);
    })
    .on('start', function() {
      log('*** nodemon started');
      startBrowserSync(isDev);
    })
    .on('crash', function() {
      log('*** nodemon crashed');
    })
    .on('exit', function() {
      log('*** nodemon exited');
    });
}

function changeEvent(event) {
  var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
  log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}

function startBrowserSync(isDev) {
  if (browserSync.active) {
    return;
  }

  log('Starting browser-sync on port ' + port);

  if (isDev) {
    gulp.watch([config.scss, config.jsES6, config.html], ['inject'])
      .on('change', function(event) {
      changeEvent(event);
    });
  } else {
    gulp.watch([config.scss, config.jsES6, config.html], ['optimize', browserSync.reload])
      .on('change', function(event) {
      changeEvent(event);
    });
  }

  var options = {
    proxy: 'localhost:' + port,
    port: 3001,
    files: isDev ? [
      config.client + '**/*.html',
      config.tmp + '**/*.css',
      config.tmp + '**/*.js'
    ] : [],
    ghostMode: {
      clicks: true,
      location: false,
      forms: true,
      scroll: true
    },
    injectChanges: true,
    logFilesChanges: true,
    logLevel: 'debug',
    logPrefix: 'gulp-patterns',
    notify: true,
    reloadDelay: 1000
  };

  browserSync(options);
}

function startTests(singleRun, done) {
  var child,
      fork = require('child_process').fork,
      karma = require('karma').server,
      excludeFiles = [],
      serverSpecs = config.serverIntegrationSpecs;

  if (args.startServers) { // gulp test --startServers
    log('Starting server');
    var savedEnv = process.env;
    savedEnv.NODE_ENV = 'dev';
    savedEnv.PORT = 8888;
    child = fork(config.nodeServer);
  } else {
    // exclude integration tests
    if (serverSpecs && serverSpecs.length) {
      excludeFiles = serverSpecs;
    }
  }

  karma.start({
    configFile: __dirname + '/karma.conf.js',
    exclude: excludeFiles,
    singleRun: !!singleRun
  }, karmaCompleted);

  function karmaCompleted(karmaResult) {
    log('Karma completed');
    if (child) {
      log('Shutting down the child process');
      child.kill();
    }
    if (karmaResult === 1) {
      // there was an error
      done('Karma: tests failed with code ' + karmaResult);
    } else {
      done();
    }
  }
}

function clean(path, done) {
  log('Cleaning ' + path);
  del(path, done);
}

function log(msg) {
  if (typeof(msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        $.util.log($.util.colors.blue(msg[item]));
      }
    }
  } else {
    $.util.log($.util.colors.blue(msg));
  }
}
