var gulp = require('gulp');

gulp.task('default', ['run', 'watch']);

gulp.task('watch', function() {
  gulp.watch('./src/*.js', ['run']);
});

gulp.task('run', function() {
  delete require.cache[require.resolve('./src/main')];
  delete require.cache[require.resolve('./src/solution')];
  delete require.cache[require.resolve('./src/input-sets')];
  require('./src/main');
});
