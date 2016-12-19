// include the required packages. 
var gulp        = require('gulp');
var stylus      = require('gulp-stylus');
var uglify      = require('gulp-uglify');
var concat      = require('gulp-concat');
var rename      = require('gulp-rename');
var browserSync = require('browser-sync').create();
var imagemin    = require('gulp-imagemin');
 
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

gulp.task('uglify', function () {
    return gulp.src('./dev/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./assets/js'))
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


gulp.task('default', ['stylus', 'uglify', 'browser-sync']);
 