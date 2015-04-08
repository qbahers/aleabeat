var gulp    = require('gulp'),
    jshint  = require('gulp-jshint'),
    csslint = require('gulp-csslint');

var paths = {
  js: ['client/js/**/*.js'],
  css: ['client/css/**/*.css']
};

gulp.task('jshint', function () {
  return gulp.src(paths.js)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('csslint', function () {
  return gulp.src(paths.css)
    .pipe(csslint('.csslintrc'))
    .pipe(csslint.reporter());
})

gulp.task('watch', function () {
  gulp.watch(paths.js, ['jshint']);
  gulp.watch(paths.css, ['csslint']);
});

gulp.task('default', ['watch', 'jshint', 'csslint']);