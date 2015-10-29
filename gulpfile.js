'use strict';

let main = require('./src/main'),
    runner = require('./src/runner'),
    gulp = require('gulp'),
    jade = require('gulp-jade'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    seq = require('run-sequence'),
    sync = require('browser-sync').create();

let config = {
  j: './index.jade',
  s: './solution/solution.js',
  sd: './solution',
  js: ['./solution/*.js', './index.jade']
};

gulp.task('default', ['browser', 'watch']);
gulp.task('all', ['browser', 'watch:node', 'watch']);
gulp.task('run', main);
gulp.task('jade', compile);
gulp.task('submit', submit);
gulp.task('sync', syncServer);
gulp.task('browser', done => seq('watch:jade', 'sync', done));
gulp.task('watch', ['submit'], () => gulp.watch(config.s, ['submit']));
gulp.task('watch:node', ['run'], () => gulp.watch(config.js, ['run']));
gulp.task('watch:jade', ['jade'], () => gulp.watch(config.js, ['jade']));


function syncServer(done) {
  sync.init({
    notify: false,
    server: {
      baseDir: './'
    }
  }, done);
}

function compile() {
  let sets;
  runner.once('completed', s => sets = s);
  runner.emit('run');

  return gulp.src(config.j)
    .pipe(jade({
      pretty: true,
      locals: {
        sets: sets
      }
    }))
    .pipe(gulp.dest('.'))
    .pipe(sync.stream());
}

function submit() {
  return gulp.src(config.s)
    .pipe(replace(/[\s\S]+SOLUTION START .+? \*\//, ''))
    .pipe(replace(/^ {2}/mg, ''))
    .pipe(replace(/\/\* SOLUTION END[\s\S]+/, ''))
    .pipe(replace(/^[\n\r]+/, ''))
    .pipe(replace(/[\n\r]+$/, '\n'))
    .pipe(rename({ basename: 'submission' }))
    .pipe(gulp.dest(config.sd));
}
