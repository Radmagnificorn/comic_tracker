var gulp = require('gulp'),
    babel = require('gulp-babel'),
    sass = require('gulp-sass');

gulp.task('styles', function () {
    return gulp.src('src/styles/*.scss')
        .pipe(sass({style: 'expanded'}))
        .pipe(gulp.dest('build/styles'));
});

gulp.task('scripts', function () {
    return gulp.src('src/*.js')
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

gulp.task('jsx', function () {
    return gulp.src('src/*.jsx')
        .pipe(babel())
        .pipe(gulp.dest('build'));
});

gulp.task('default', ['styles', 'scripts', 'markup', 'config']);