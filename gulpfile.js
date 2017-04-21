var gulp = require('gulp');
// var webpack = require('webpack-stream');
var runSequence = require('run-sequence');

gulp.task('webpack', function(){
  return gulp.src('src/main.js')
    .pipe(webpack( require('./webpack.config.js')))
    .pipe(gulp.dest('dist/'));
});

gulp.task('copy', [
  'copy:assets',
  'copy:static',
  'copy:html'
]);

gulp.task('copy:assets', function(){
  return gulp.src(['assets/**/*'])
    .pipe(gulp.dest('dist/assets/'));
});

gulp.task('copy:static', function(){
  return gulp.src(['static/**/*'])
    .pipe(gulp.dest('dist/static/'));
});


gulp.task('copy:html', function(){
  return gulp.src(['*.html'])
    .pipe(gulp.dest('dist/'));
});

gulp.task('copy:favicon', function(){
  return gulp.src(['favicon.ico'])
    .pipe(gulp.dest('dist/'));
});

gulp.task('build', function(done){
  return runSequence(
    // 'webpack',
    'copy',
    done);
});
