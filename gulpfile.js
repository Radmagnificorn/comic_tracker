var gulp = require('gulp'),
    sass = require('gulp-ruby-sass');

gulp.task('styles', function () {
    return gulp.src('src/*.scss')
        .pipe(sass({style: 'expanded'}))
        .pipe(gulp.dest('build/styles'));
});

gulp.task('scripts', function () {
    return gulp.src('src/styles/*.js')
        .pipe(gulp.dest('build'));
});

gulp.task('markup', function () {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('build'));
});

gulp.task('config', function () {
    return gulp.src('src/config/*.json')
        .pipe(gulp.dest('build'));
});

gulp.task('build', ['styles', 'scripts', 'markup', 'config']);