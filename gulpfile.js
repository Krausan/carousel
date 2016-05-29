'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');



gulp.task('default', function() {
 gulp.watch('src/scss/main.scss', ['sass']);

});
 
gulp.task('sass', function () {
  return gulp.src('src/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/css/'));
});
 
// gulp.task('webserver', function() {
//   gulp.src('carousel')
//     .pipe(webserver({
//       livereload: true,
//       directoryListing: true,
//       open: true
//     }));
// });

//  gulp.watch('index.html',['webserver']);
// var webserver = require('gulp-webserver');