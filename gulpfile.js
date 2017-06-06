var gulp = require('gulp');
var webpackStream = require('webpack-stream');
var webpack = require('webpack');
var inject = require('gulp-inject');
var runSequence = require('run-sequence');

gulp.task('webpack', function(){
  return gulp.src('index.js')
    .pipe(webpackStream(require('./webpack.config.prod.js'), webpack))
    .pipe(gulp.dest('dist/assets'));
});

gulp.task('copy', [
  'copy:assets',
  'copy:static',
  'copy:index'
]);

gulp.task('copy:assets', function() {
  return gulp.src(['assets/**/*'])
    .pipe(gulp.dest('dist/assets'));
});

gulp.task('copy:static', function() {
  return gulp.src(['static/**/*'])
    .pipe(gulp.dest('dist/static/'));
});

gulp.task('copy:index', function() {
  return gulp.src(['index.html'])
    .pipe(gulp.dest('dist/'));
});

gulp.task('copy:favicon', function() {
  return gulp.src(['favicon.ico'])
    .pipe(gulp.dest('dist/'));
});

gulp.task('inject', [
  'inject:extract-styles'
 ]);

gulp.task('inject:extract-styles', function() {
  var sources = gulp.src('./dist/assets/styles.css', {read: false});
  return gulp.src('./dist/index.html')
    .pipe(inject(sources, {relative: true}))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build', function(done){
  return runSequence(
    'webpack',
    'copy',
    'inject', done);
});
