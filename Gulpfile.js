var gulp = require("gulp"),
    rename = require('concur-gulp-rename'),
    webpack = require('webpack-stream'),
    fs = require('fs'),
    path = require('path'),
    gzip = require('gulp-gzip');

process.env.NODE_ENV = process.env.NODE_ENV || "development";

function getFolders(dir) {
    return fs.readdirSync(dir)
        .filter(function (file) {
            return fs.statSync(path.join(dir, file)).isDirectory();
        });
}

var watchMode = false;
gulp.task('webpack', function () {
    return gulp.src("webpack.config.js")
        .pipe(webpack(require('./webpack.config.js'), require('webpack')))
        .pipe(gulp.dest('public'));
});
gulp.task('copy', function () {
    return [gulp.src("./app/assets/images/**/*")
        .pipe(gulp.dest('public/images')),
        gulp.src("./app/assets/global/**/!(_)*.js")
            .pipe(gulp.dest('public/global')),
        gulp.src("./app/assets/wechat-view/**/!(_)*.js")
            .pipe(gulp.dest('public/wechat-view')),
        gulp.src("./app/assets/vendor/**/*")
            .pipe(gulp.dest('public/vendor'))];
});

gulp.task('build', ['webpack', 'copy']);
gulp.task('clean', function (cb) {
    require('del')(['./public'], cb);
});
gulp.task('cleangz', function (cb) {
    require('del')(['./public/**/*.gz'], cb);
})
gulp.task('default', ['build']);
gulp.task('buildgz', ['build'], function () {
    return gulp.src('public/**/!(*.gz|*.png|*.jpg|*.jpeg|*.svg)') // png and jpg already very well compressed, might even make it larger
        .pipe(require('gulp-size')({showFiles: true}))
        .pipe(gzip({gzipOptions: {level: 9}}))
        .pipe(rename({extname: ".gz"}))
        .pipe(require('gulp-size')({showFiles: true}))
        .pipe(gulp.dest('public'));
});
gulp.task('deploy', ['build', 'buildgz'], function () {
    var readYaml = require('read-yaml');
    var config = readYaml.sync('./config/deploy.yml')[process.env.NODE_ENV];
    if (!config) {
        throw "./config/deploy.yml#" + process.env.NODE_ENV + " is required";
    }
    // this requires a config to be written somewhere
    // clean seems to be clashing with everything, run it seperately
    var options = {headers: {'Cache-Control': 'max-age=315360000, no-transform, public'}}
    return gulp.src('./public/**/*')
        .pipe(rename(function (path) {

            path.dirname = "public/" + path.dirname;
            console.log(path);
        }))
        .pipe(require('gulp-s3')(config, options));
});
gulp.task('server', ['build'], function () {
    process.env.RUNNING = "local";
    var App = require('./index.js');
    var HTTPServer = new App();
    HTTPServer.start(function () {
        console.log('info', 'server listening');
    });
    watchMode = true;
    return gulp.watch(['app/assets/**', 'app/view/**'], ["cleangz", "build"]);
});
