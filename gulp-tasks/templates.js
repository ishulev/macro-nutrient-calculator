// grab our gulp packages
var gulp	= require('gulp'),
	jade	= require('gulp-jade'),
	path	= require('path');

var config = {
	publicDir: './dist',
	sourceDir: './source'
};

gulp.task('templates', function() {
	return gulp
		.src(path.join(config.sourceDir, 'jade', 'templates','*.jade'))
		.pipe(jade())
		.pipe(gulp.dest(path.join(config.publicDir, 'templates')));
});