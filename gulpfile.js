'use strict';

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    watch = require('gulp-watch'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    jslint = require('gulp-jslint');

gulp.task('minify', function () {
    gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build'));
});

gulp.task('concat', function () {
    gulp.src('build/!*.js')
        .pipe(concat('dist.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
    gulp.watch('js/*.js', ['main']);
});

gulp.task('connect', function () {
    connect.server({
        livereload: true
    });
});


gulp.task('default', ['connect', 'watch']);