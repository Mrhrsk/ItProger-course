const gulp = require('gulp');
const cleancss = require('gulp-clean-css');
const cleanjs = require('gulp-uglify');
const autoprefix = require('gulp-autoprefixer');
const del = require('del');
const bsync = require('browser-sync').create();


gulp.task('move', function(){
  return gulp.src('app/**/*.*')
  .pipe(gulp.dest('public/'));
});

gulp.task('cleancss', function () {
  return gulp.src('app/css/*.css')
    .pipe(cleancss())
    .pipe(gulp.dest('public/css/'));
});

gulp.task('cleanjs',function () {
  return gulp.src('app/js/*.js')
    .pipe(cleanjs())
    .pipe(gulp.dest('public/js/'));
});

gulp.task('prefix', function () {
  return gulp.src('app/css/*.css')
  .pipe(autoprefix({
    overrideBrowserslist: ['last 20 versions'],
    cascade: false
  }))
  .pipe(cleancss())
  .pipe(gulp.dest('public/css/'));
});

gulp.task('bsync',function () {
  bsync.init({
    server:'public'
  });
  bsync.watch('public/**/*.*').on('change',bsync.reload);
});

gulp.task('deljs', function () {
  return del('public/js/main.js');
});

gulp.task('delcss', function () {
  return del('public/css/style.css');
});

gulp.task('watchfiles', function () {
  gulp.watch('app/css/*.*', gulp.series('prefix'));//series- делать таски один за одним
  gulp.watch('app/js/*.*', gulp.series('cleanjs'));
});

gulp.task('default', gulp.parallel('watchfiles', 'bsync'));//patallel-делает таски паралельно
