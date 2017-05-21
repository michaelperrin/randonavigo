'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');

var paths = {
  styles: './web/sass/**/*.scss',
  scripts: './web/js/**/*.js'
};

gulp.task('scripts', function() {
  gulp.src([
      // Libraries
      './node_modules/leaflet/dist/leaflet.js',
      './web/lib/leaflet-gpx-1.3.1/gpx.js',
      './node_modules/jquery/dist/jquery.js',
      './node_modules/magnific-popup/dist/jquery.magnific-popup.js',

      // App files
      './web/js/hike/show.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(uglify().on('error', function(e){
        console.log(e);
     }))
    .pipe(concat('front.js'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./web/dist/js'));
});

gulp.task('styles', function() {
  return gulp.src(paths.styles)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./web/dist/css'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('default', [ 'styles', 'scripts' ]);
