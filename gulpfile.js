var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var minifyInline = require('gulp-minify-inline');
var uglify = require('gulp-uglify');
var pump = require('pump');
var browserSync = require('browser-sync').create();
var historyApiFallback = require('connect-history-api-fallback');

gulp.task('compress', function (cb) {
    "use strict";
    pump([
        gulp.src('src/*.js'),
        uglify(),
        gulp.dest('dist')
    ], cb);
});


gulp.task('minify', function () {
    "use strict";
    return gulp
        .src('src/*.html')
        .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
        .pipe(minifyInline())
        .pipe(gulp.dest('dist'));
});

gulp.task('copy', function () {
    "use strict";
    return gulp
        .src([
            'src/*.xml',
            'src/*.css',
            'src/*.txt'
        ])
        .pipe(gulp.dest('dist'));
});

gulp.task('copy-libs', function () {
    "use strict";
    return gulp
        .src([
            'src/libs/**'
        ])
        .pipe(gulp.dest('dist/libs'));
});

gulp.task('copy-imgs', function () {
    "use strict";
    return gulp
        .src([
            'src/imgs/**'
        ])
        .pipe(gulp.dest('dist/imgs'));
});

gulp.task('build', [
    'minify', 'copy', 'copy-libs', 'copy-imgs', 'compress'
]);

gulp.task('serve-dev', function () {
    "use strict";
    browserSync.init({
        server: {
            baseDir: "./src",
            middleware: [historyApiFallback()]
        }
    });
    gulp.watch("./src/*.html").on("change", browserSync.reload);
});


gulp.task('serve-dist', function () {
    "use strict";
    browserSync.init({
        server: {
            baseDir: "./dist",
            middleware: [historyApiFallback()]
        }
    });
});
