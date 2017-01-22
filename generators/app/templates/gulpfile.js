// include the required packages. 
var gulp        = require('gulp'),
    stylus      = require('gulp-stylus'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    rename      = require('gulp-rename'),
    browserSync = require('browser-sync').create(),
    imagemin    = require('gulp-imagemin'),
    webp        = require('gulp-webp'),
    defer       = require("gulp-defer");
 
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
    return gulp.src('./dev/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
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

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('dev/stylus/**/*', ['stylus']);
    gulp.watch('dev/js/**/*', ['uglify']);
    gulp.watch(['*.html', 'assets/js/**/*']).on('change', browserSync.reload); // 'assets/**/*',
});

// Image task
// compress images
gulp.task('image', function(){
    gulp.src('img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('img'))
        .pipe(notify({
            "title": "Resimler büyümüşte küçülmüş.",
            "message": "boyutları küçültüldü efendim.",
            "sound": "Frog", // case sensitive
            "icon": path.join("../yaver/satir.png"), // case sensitive
            "onLast": true,
            "wait": false
        }));
});


gulp.task('default', ['stylus', 'js', 'browser-sync']);
 