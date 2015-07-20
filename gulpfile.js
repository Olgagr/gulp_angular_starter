var gulp        = require('gulp'),
    args        = require('yargs').alias('v', 'verbose').argv,
    $           = require('gulp-load-plugins')({lazy:true}),
    del         = require('del'),
    wiredep     = require('wiredep').stream,
    config      = require('./gulp.config')(),
    browserSync = require('browser-sync'),
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

  log('Wire up the bower css, js and our app js into the html');

  var options = config.getWiredepDefaultOptions();
  return gulp
    .src(config.index)
    .pipe(wiredep(options))
    .pipe($.inject(gulp.src(config.js)))
    .pipe(gulp.dest(config.client));
});

gulp.task('inject', ['wiredep', 'styles', 'templatecache'], function() {

  log('Wire up the app css into the html and call wiredep');

  return gulp
    .src(config.index)
    .pipe($.inject(gulp.src(config.css)))
    .pipe(gulp.dest(config.client));
});

gulp.task('optimize', ['inject'], function() {

  var templateCache = config.tmp + config.templateCache.file,
      assets = $.useref.assets({searchPath: './'});

  log('Optimizing the javascript, css, html');

  return gulp
    .src(config.index)
    .pipe($.plumber())
    .pipe($.inject(gulp.src(templateCache, {read: false}), 
      {starttag: '<!-- inject:templates:js -->'}))
    .pipe(assets)
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe(gulp.dest(config.build));
});

gulp.task('serve-build', ['optimize'], function() {
  serve(false);
});

gulp.task('serve-dev', ['inject'], function () {
  serve(true);
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

  if(isDev) {
    gulp.watch([config.scss], ['styles']).on('change', function(event) {
      changeEvent(event);
    });
  } else {
    gulp.watch([config.scss, config.js, config.html], ['optimize', browserSync.reload]).on('change', function(event) {
      changeEvent(event);
    });
  }

  var options = {
    proxy: 'localhost:' + port,
    port: 3001,
    files: isDev ? [
      config.client + '**/*.*',
      '!' + config.scss,
      config.tmp + '**/*.css'
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
    reloadDelay: 0
  };

  browserSync(options);
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
