var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');

var AutoPrefixPlugin = require('less-plugin-autoprefix');
var autoprefix = new AutoPrefixPlugin({
	browsers: ['last 2 versions', 'opera >= 12']
});

var DEST_PROD = './out';
var DEST_STYLES = './out/styles';
var DEST_IMG = './out/img';

gulp.task('styles', function() {
	return gulp.src('src/styles/*.less')
		.pipe(plumber())
		.pipe(less({
			plugins: [autoprefix]
		}))
		.pipe(gulp.dest(DEST_STYLES));
});

gulp.task('stylescss', function() {
	return gulp.src('src/styles/*.css')
		.pipe(minifyCSS())
		.pipe(gulp.dest(DEST_STYLES));
});

gulp.task('html', function() {
  return gulp.src('src/*.html')
	.pipe(gulp.dest(DEST_PROD));
});

gulp.task('img', function() {
  return gulp.src('src/img/**/*')
	.pipe(gulp.dest(DEST_IMG));
});

gulp.task('watch', function() {
  gulp.watch('src/img/**/*', ['img']);
  gulp.watch('src/*.html', ['html']);
  gulp.watch('src/styles/*.less', ['styles']);
  gulp.watch('src/styles/*.css', ['stylescss']);
});

gulp.task('default', ['html', 'styles', 'img', 'stylescss', 'watch']);