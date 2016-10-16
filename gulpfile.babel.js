import open from "open";
import path from "path";
import del from "del";
import gulp from "gulp";
import runSequence from "run-sequence";
import gulpLoadPlugins from "gulp-load-plugins";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";

import config, {HOST, PORT, URL, SRC_DIR, BUILD_DIR, DIST_DIR} from "./webpack.config";


const $ = gulpLoadPlugins({camelize: true});


// Primary tasks
gulp.task('dev', (done) => runSequence('build', 'server:dev', 'open', done));

gulp.task('build', (done) => runSequence('build:clean', 'build:index', 'build:copy', done));

gulp.task('dist', (done) => runSequence('dist:clean', 'dist:build', 'dist:index', 'dist:copy', done));

gulp.task('open', () => open(URL));

gulp.task('clean', ['build:clean', 'dist:clean']);


// Clean up build directory
gulp.task('build:clean', () => del([BUILD_DIR]));

// Copy static files
gulp.task('build:copy', () => {
    return gulp.src(SRC_DIR + '/static/**/*')
        .pipe(gulp.dest(BUILD_DIR + '/static/'))
});

// Copy index.html and inject js bundle for dev server
gulp.task('build:index', () => {
    return gulp
        .src(SRC_DIR + '/index.html')
        .pipe($.injectString.after('<!-- inject:app:js -->', '<script src="app.bundle.js"></script>'))
        .pipe(gulp.dest(BUILD_DIR));
});

// Clean dist directory
gulp.task('dist:clean', () => del([DIST_DIR]));

// Copy index.html and inject js/css files for distribution
gulp.task('dist:index', () => {

    let target = gulp.src(SRC_DIR + '/index.html');
    let sources = gulp.src(['*.{css,js}'], {read: false, cwd: path.resolve(DIST_DIR)});

    return target.pipe($.inject(sources, {
        //relative: true,
        addRootSlash: false,
        starttag: '<!-- inject:app:{{ext}} -->'
    }))
        .on('error', $.util.log)
        .pipe(gulp.dest(DIST_DIR));
});

// Copy static files to dist directory
gulp.task('dist:copy', () => {
    return gulp.src(SRC_DIR + '/static/**/*')
        .pipe(gulp.dest(DIST_DIR + '/static/'))
});

// Build for distribution
gulp.task('dist:build', (done) => {
    webpack(config(false), function(err, stats) {
        if (err) throw new $.util.PluginError('webpack', err);
        $.util.log('[webpack]', stats.toString({
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false
        }));
        done();
    });
});


// Start dev server
gulp.task('server:dev', () => {
    let compiler = webpack(config(true));

    return new WebpackDevServer(compiler, {
        contentBase: BUILD_DIR,
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false
        },
        hot: true,
        watchOptions: {
            aggregateTimeout: 100,
            poll: 300
        }
    }).listen(PORT, HOST, (err) => {
        if (err) throw new $.util.PluginError('webpack-dev-server', err);
        // Server listening
        $.util.log('[webpack-dev-server]', URL);
    });
});