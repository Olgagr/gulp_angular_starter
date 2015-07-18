var gulp        = require('gulp'),
    args        = require('yargs').alias('v', 'verbose').argv,
    $           = require('gulp-load-plugins')({lazy:true}),
    del         = require('del'),
    wiredep     = require('wiredep').stream,
    config      = require('./gulp.config')(),
    port        = process.env.PORT || config.defaultPort;

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

gulp.task('clean-styles', function(done) {
  var files = config.tmp + '**/*.css';
  clean(files, done);
});

gulp.task('styles-watch', function() {
  gulp.watch([config.scss], ['styles']);
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

gulp.task('inject', ['wiredep', 'styles'], function() {

  log('Wire up the app css into the html and call wiredep');

  return gulp
    .src(config.index)
    .pipe($.inject(gulp.src(config.css)))
    .pipe(gulp.dest(config.client));
});

gulp.task('serve-dev', ['inject'], function () {
  var isDev = true;

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
    })
    .on('start', function() {
      log('*** nodemon started');
    })
    .on('crash', function() {
      log('*** nodemon crashed');
    })
    .on('exit', function() {
      log('*** nodemon exited');
    });
});

//////

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
