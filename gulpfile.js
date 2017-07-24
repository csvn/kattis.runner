'use strict';

let main = require('./src/main'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel'),
    jadeify = require('jadeify'),
    babelify = require('babelify'),
    watchify = require('watchify'),
    browserify = require('browserify'),
    buffer = require('vinyl-buffer'),
    source = require('vinyl-source-stream'),
    seq = require('run-sequence'),
    sync = require('browser-sync').create();

let config = {
  s: './solution/solution.js',
  sd: './solution',
  js: ['./solution/*.js', './index.jade']
};


gulp.task('default', ['browser', 'watch']);
gulp.task('all', ['browser', 'watch:node', 'watch']);
gulp.task('run', main);
gulp.task('submit', submit);
gulp.task('sync', syncServer);
gulp.task('browser', done => seq('watch:browser', 'sync', done));
gulp.task('watch', ['submit'], () => gulp.watch(config.s, ['submit']));
gulp.task('watch:node', ['run'], () => gulp.watch(config.js, ['run']));
gulp.task('watch:browser', setupBundle);


function syncServer(done) {
  sync.init({
    notify: false,
    server: {
      baseDir: './'
    }
  }, done);
}

function submit() {
  return gulp.src(config.s)
    .pipe(replace(/[\s\S]+SOLUTION START .+? \*\//, ''))
    .pipe(replace(/^ {2}/mg, ''))
    .pipe(replace(/\/\* SOLUTION END[\s\S]+/, ''))
    .pipe(replace(/^[\n\r]+/, ''))
    .pipe(replace(/[\n\r]+$/, '\n'))
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(rename({ basename: 'submission' }))
    .pipe(gulp.dest(config.sd));
}

function setupBundle() {
  let conf = Object.assign({
    debug: true,
    entries: './src/browser.js',
    paths: ['./solution'],
    noParse: ['./solution/io-sets.js']
  }, watchify.args);

  return bundle.call(
    browserify(conf)
      .plugin(watchify)
      .transform(jadeify, { pretty: true })
      .transform(babelify)
      .on('update', bundle)
      .on('log', gutil.log)
  );
}

function bundle() {
  return this.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify error'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./src'))
    .pipe(sync.stream());
}
