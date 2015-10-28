var gulp = require('gulp'),
    exec = require('child_process').exec;

gulp.task('default', ['run', 'watch']);

gulp.task('watch', () => {
  gulp.watch('./solution/*.js', ['run']);
});

gulp.task('run', done => {
  exec('node src/main.js', function(err, stdout) {
    if (err) {
      throw err;
    }

    console.log(stdout);
    done();
  });
});
