'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');

var webpack = require('webpack-stream');
var ghPages = require('gulp-gh-pages');
var autoprefixer = require('gulp-autoprefixer');
var runSequence = require('run-sequence');

livereload({
  start: true,
  port: 35729
});

/**
 *
 * Sass
 *
 */
gulp.task('sass', function () {
  gulp.src('./scss/**/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['>1%']
    }))
    .pipe(livereload())
    .pipe(gulp.dest('./css'));

});


/**
 *
 * Watch
 *
 */
gulp.task('watch:sass', function () {
  gulp.run('sass');
  gulp.watch('./scss/**/*.scss', ['sass']);
});

/**
 *
 * Webpack
 *
 */
gulp.task('webpack', function(){
  return gulp.src('src/main.js')
    .pipe(webpack( require('./webpack.config.js')))
    .pipe(gulp.dest('dist/'));
});


/**
 *
 * Copy
 *
 */
gulp.task('copy', [
  'copy:img',
  'copy:css',
  'copy:html',
  'copy:font',
  'copy:src',
  'copy:cname',
  'copy:favicon',
  'copy:resume'
]);

gulp.task('copy:img', function(){
  return gulp.src(['img/**/*'])
    .pipe(gulp.dest('build/img/'));
});

gulp.task('copy:css', function(){
  return gulp.src(['css/**/*'])
    .pipe(gulp.dest('build/css/'));
});

gulp.task('copy:html', function(){
  return gulp.src(['*.html'])
    .pipe(gulp.dest('build/'));
});

gulp.task('copy:font', function(){
  return gulp.src(['font/**/*'])
    .pipe(gulp.dest('build/font/'));
});

gulp.task('copy:src', function(){
  return gulp.src(['src/**/*'])
    .pipe(gulp.dest('build/src/'));
});

gulp.task('copy:cname', function(){
  return gulp.src(['CNAME'])
    .pipe(gulp.dest('build/'));
});

gulp.task('copy:favicon', function(){
  return gulp.src(['favicon.ico'])
    .pipe(gulp.dest('build/'));
});

gulp.task('copy:resume', function(){
  return gulp.src(['resume/**/*'])
    .pipe(gulp.dest('build/resume/'));
});




/**
 *
 * Build
 *
 */
gulp.task('build', function(done){
  return runSequence(
    'webpack',
    'copy',
    done);
});


/**
 *
 * Deploy
 *
 */
gulp.task('deploy', function() {
  return gulp.src('./build/**/*')
    .pipe(ghPages({
      remoteUrl: 'git@github.com:cfangwei/cfangwei.github.io.git',
      branch: 'master'
    }));
});
