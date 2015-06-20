var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');

var AutoPrefixPlugin = require('less-plugin-autoprefix');
var autoprefix = new AutoPrefixPlugin({
	browsers: ['last 2 versions', 'opera >= 12']
});

var DEST_DEV = './out/dev';
var DEST_PROD = './out/prod';

var STYLES = './styles/*.less';

gulp.task('styles', function() {
	return gulp.src(STYLES)
		.pipe(plumber())
		.pipe(less({
			plugins: [autoprefix]
		}))
		.pipe(gulp.dest(DEST_DEV))
		.pipe(minifyCSS())
		.pipe(gulp.dest(DEST_PROD));
});

gulp.task('watch', function () {
	watch(STYLES, function() {
		gulp.start('styles');
	});
});

gulp.task('default', ['styles']);
