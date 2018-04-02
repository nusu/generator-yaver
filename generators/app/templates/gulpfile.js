// include the required packages. 
var gulp        = require('gulp'),
    stylus      = require('gulp-stylus'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    rename      = require('gulp-rename'),
    browserSync = require('browser-sync').create(),
    imagemin    = require('gulp-imagemin'),
    webp        = require('gulp-webp'),
    defer       = require("gulp-defer"),
    babel       = require('gulp-babel');
 
// Get one .styl file and render 
gulp.task('stylus', function () {
    return gulp.src('./dev/stylus/main.styl')
        .pipe(stylus({
            compress: true
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./assets/css'))
        .pipe(browserSync.stream());
});

// javascript task
gulp.task('js', function () {
    return gulp.src(['./dev/js/libs/*.js', './dev/js/*.js'])
        .pipe(concat('main.js'))
        .pipe(babel())
        // .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./assets/js'))
        .pipe(browserSync.stream());
});

// render blocking
gulp.task('render', function() {
  return gulp.src('./*.html')
   .pipe(defer())
   .pipe(gulp.dest(''));
});

// convert images to webp format
gulp.task('webp', function () {
    return gulp.src(['assets/img/*.png', 'assets/img/*.jpg', 'assets/img/*.jpeg', 'assets/img/*.gif'])
        .pipe(webp())
        .pipe(gulp.dest('./assets/img'));
});

// static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('dev/stylus/**/*', ['stylus']);
    gulp.watch('dev/js/**/*', ['js']);
    gulp.watch(['*.html', 'assets/js/**/*']).on('change', browserSync.reload); // 'assets/**/*',
});

// for processwire
gulp.task('processwire', function() {
    browserSync.init({
        proxy: "http://localhost:8888/"
    });

    gulp.watch('dev/stylus/**/*', ['stylus']);
    gulp.watch('dev/js/**/*', ['js']);
    gulp.watch(['*.html', 'parts/layout/*.twig', '*.twig', 'assets/js/**/*']).on('change', browserSync.reload); // 'assets/**/*',
});

// Image task
// compress images
gulp.task('image', function(){
    gulp.src('img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('img'));
});


gulp.task('default', ['stylus', 'js', 'browser-sync']);
// gulp.task('default', ['stylus', 'js', 'processwire']);
 