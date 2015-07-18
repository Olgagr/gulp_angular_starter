var gulp = require('gulp'),
    args = require('yargs').alias('v', 'verbose').argv,
    $ = require('gulp-load-plugins')({lazy:true}),
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

//////

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
