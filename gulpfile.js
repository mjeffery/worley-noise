var gulp = require('gulp');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var connect = require('gulp-connect');
var watch = require('gulp-watch');
var batch = require('gulp-batch');

gulp.task('usemin', function() {
	return gulp.src('./src/index.html')
		.pipe(usemin({
			vendor_js: [ uglify() ],
			js: [ 'concat', rev() ],
		}))
		.pipe(gulp.dest('build/'))
		.pipe(connect.reload());
});

gulp.task('connect', function() {
	connect.server({
		root: 'build',
		port: 8001,
		livereload: true
	});
});

gulp.task('watch', function() {
	watch(['**/*.html', '**/*.js'], batch(function(events, done) {
		gulp.start('usemin');
	}));
});

gulp.task('default', ['usemin', 'connect', 'watch'] );
