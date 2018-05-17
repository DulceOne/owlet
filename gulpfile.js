var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass-compile', function () {
    gulp.src('./scss/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css/'));
});

gulp.task('watch-sass', function () {
    gulp.watch('./scss/*.scss', ['sass-compile']);
});