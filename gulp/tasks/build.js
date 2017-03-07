//for building: Lektion 56

var gulp = require('gulp'),
imageMin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
revision = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify')
browserSync = require('browser-sync').create();

gulp.task('previewDist', function() {
	browserSync.init({
		notify: false,
		server: {
			baseDir: "docs"  //compare to watch.js!!
		}
	});
});

gulp.task('deleteDistFolder', ['icons'], function() {
	return del('./docs');

});

gulp.task('copyGenerlFiles', ['deleteDistFolder'], function() {
	var pathToCopy = [
		'./app/**/*',
		'!./app/index.html',
		'!./app/assets/images/**',
		'!./app/assets/styles/**',
		'!./app/assets/scripts/**',
		'!./app/temp/',
		'!./app/temp/**'
	]

	return gulp.src(pathToCopy)
		.pipe(gulp.dest('./docs'))
});

gulp.task('optimzeImages', ['deleteDistFolder'], function() {
	// ! means exclude
	return gulp.src(['./app/assets/images/**/*', '!./app/assets/icons', '!./app/assets/images/icons/**/*'])
		.pipe(imageMin({
			progressive: true,
			interlaced: true,
			multipass: true
		}))
		.pipe(gulp.dest("./docs/assets/images"));
});

gulp.task('useminTrigger', ['deleteDistFolder'], function() {
	gulp.start('usemin');
});

gulp.task('usemin', ['styles', 'scripts'], function() {
	return gulp.src('./app/index.html')
		.pipe(usemin({
			//return -> makes gulp aware, when the function has finsihed
			css: [function() {return revision()}, function() {return cssnano()}],
			js: [function() {return revision()}, function() {return uglify()}]
		}))
		.pipe(gulp.dest("./docs/"))
});

gulp.task('build', ['deleteDistFolder', 'copyGenerlFiles', 'optimzeImages', 'useminTrigger']);