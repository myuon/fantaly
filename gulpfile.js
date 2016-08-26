var gulp = require('gulp');
var shell = require('gulp-shell');
var webpack = require('webpack-stream');

gulp.task('webpack', function() {
  gulp.src(['./src/js/interface.js'])
    .pipe(webpack({
      output: {
        filename: 'bundle.js',
      },
      externals: {
        "createjs": "createjs"
      }
    }))
    .pipe(gulp.dest('./src/js'));
});

gulp.task('haste', function() {
  gulp.src("src/hs/Main.hs")
    .pipe(shell([
      "cd src/hs; hastec '--start=$HASTE_MAIN(); initialize();' --with-js=../js/bundle.js Main.hs -o ../../pages/js/main.js"
    ]));
});

gulp.task('watch', ['webpack', 'haste'], function() {
  gulp.watch('./src/hs/*.hs', ['haste']);
  gulp.watch('./src/js/*.js', ['webpack']);
});

gulp.task('default', ['watch']);
