var gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	cleancss = require('gulp-clean-css'),
//	concat = require('gulp-concat'),
	imgmin = require('gulp-imagemin'),
	plumber = require('gulp-plumber'), //处理错误，不跳出gulp
//	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglify'),
//	connect = require('gulp-connect'),
	htmlmin = require('gulp-htmlmin'),
//	header = require('gulp-header'),
	browserSync = require('browser-sync').create(),
    reload = browserSync.reload;


gulp.task('sassc',function(){
	gulp.src('src/sass/*.scss')
//		.pipe(sass().on('error', sass.logError))
		.pipe(plumber())
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(gulp.dest('src/css'))	
		.pipe(browserSync.reload({stream:true}))
});


//监听文件，浏览器同步
gulp.task('sever',['sassc'],function(){
       browserSync.init({
           server: {
               baseDir: './src'   //该路径到html的文件夹目录
           }
       });
    gulp.watch('src/sass/*.scss',['sassc']);
    gulp.watch('src/**/*.html').on('change',browserSync.reload);
    gulp.watch('src/**/*.js').on('change',browserSync.reload);
})

gulp.task('imgmin',function(){
	gulp.src('src/imgs/**/*.{jpg,gif,png,ico}')
		.pipe(imgmin())
		.pipe(gulp.dest('dist/imgs'))
});

gulp.task('htmlmin', function() {
 	gulp.src('src/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
});
gulp.task('css',function(){
	gulp.src('src/**/*.css')
		.pipe(cleancss())
		.pipe(gulp.dest('dist'))
})
gulp.task('uglify',function(){
	gulp.src('src/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
});

gulp.task('default', ['imgmin','htmlmin','css','uglify']);