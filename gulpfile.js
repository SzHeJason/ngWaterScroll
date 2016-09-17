var gulp = require('gulp');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');

//===========================
//      javascript 压缩
//===========================
gulp.task('javascript', function() {
    return gulp.src('dist/ngWaterScoll.js')
        .pipe(uglify({
            mangle: false
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/'))
});


//===========================
//      复制Js
//===========================
gulp.task('copyJs', function() {
    return gulp.src('src/ngWaterScoll.js')
        .pipe(gulp.dest('dist/'))
});


gulp.task('default', ['copyJs'], function() {
    gulp.start('javascript')
})