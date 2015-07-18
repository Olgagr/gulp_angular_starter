var gulp = require('gulp'),
    args = require('yargs').alias('v', 'verbose').argv,
    $ = require('gulp-load-plugins')({lazy:true}),
    del = require('del'),
    config = require('./gulp.config')();

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
    .pipe($.sourcemaps.write())
    .pipe($.autoprefixer())
    .pipe(gulp.dest(config.tmp));
});

gulp.task('clean-styles', function(done) {
  var files = config.tmp + '**/*.css';
  clean(files, done);
});

gulp.task('styles-watch', function(){
  gulp.watch([config.scss], ['styles']);
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
