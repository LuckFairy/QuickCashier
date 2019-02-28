"use strict";

var gulp = require('gulp');
var pump = require('pump');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var $ = require('gulp-load-plugins')();

//头部添加注释函数,只要在压缩中调用.pipe(getHeader())
function getHeader() {
	var pkg = require('./package.json');
    var template = ['/**',
        ' * 快捷支付项目',
        ' * @authors  luckfairy',
        ' * @version v.1',
        ' * @link 18306679493@163.com',
        ' * @license mst',
        ' */',
        ''
    ].join('\n');
    return $.header(template, {
        pkg: pkg
    });
}
//错误展示
//var handleError = function(err) {
//  var colors = $.util.colors;
//  console.log('\n');
//  $.util.log(colors.red('Error!'));
//  $.util.log('fileName: ' + colors.red(err.fileName));
//  $.util.log('lineNumber: ' + colors.red(err.lineNumber));
//  $.util.log('message: ' + err.message);
//  $.util.log('plugin: ' + colors.yellow(err.plugin));
//};

//处理sass文件
gulp.task('sass',function(){
	gulp.src('src/sass/*.scss')
	.pipe($.plumber())
	.pipe($.sass({outputStyle:'compact'}).on('error',$.sass.logError))
	.pipe($.autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: false
        }))
//	.pipe(getHeader())
	.pipe(gulp.dest('src/css/'))	
	.pipe(browserSync.reload({stream:true}))
})
//监控sass,只要sass有变动就自动编译
gulp.task('complite',function(){
	gulp.watch('./src/sass/*.scss',['sass']);
})

//压缩js
gulp.task('js',function(cb){
	 pump([
	      gulp.src('src/js/*.js'),
	      $.uglify(),
	      getHeader(),
	      gulp.dest('dist/js'),
	      browserSync.reload({stream:true})
	    ],
	    cb
  	);
})
//压缩html
gulp.task('minify', function() {
 	gulp.src('src/**/*.html')
    .pipe($.htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
});


//监听文件，浏览器同步
gulp.task('server',['sass','js','minify'],function(){
	 var files = [
        '**/*.html',
        '**/*.css',
        '**/*.js',
    ];
	//代理模式（本地服务器）
    browserSync.init(files,{
//  	port: 8888,
//      proxy: 'http://192.168.32.10:8020/work/project/mui_quick/src/',  //此处根据项目实际目录填写
        //从应用程序目录中提供文件，指定特定文件名为索引
		server: {
		    baseDir: "./src"
		},
    });
//本地静态文件
//     browserSync.init(files, {
//         server: {
//             baseDir: './src'   //该路径到html的文件夹目录
//         }
//     });
//  gulp.watch('./src/**/*.html').on('change',browserSync.reload);
//  gulp.watch('./src/css/*.css').on('change',browserSync.reload);
    gulp.watch('./src/sass/*.scss',['sass']);
//  gulp.watch('./src/js/*.js',['js']);
    
    
})



//压缩image
//*
 gulp.task('image',function(){
 	gulp.src("src/images/*")
 	.pipe($.imagemin())
 	.pipe(gulp.dest('dist/images'))
 })
 
 //*/
gulp.task('minifycss', function() {
    return gulp.src('src/css/**/*.css')
//      .pipe(sourcemaps.init())
        .pipe($.autoprefixer({
             browsers: ['last 2 versions', 'Android >= 4.0'],
             cascade: false
        }))
        .pipe($.minifyCss())
//      .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/css/'));
});