var gulp = require('gulp');
var ts = require('gulp-typescript');
var rimraf = require('gulp-rimraf');
var nodemon = require('gulp-nodemon');
 
gulp.task('cleanBuiltDir', function () {
  return gulp.src('build').pipe(rimraf());
}); 
 
gulp.task('buildBackEnd', ['cleanBuiltDir'],  function () {
  var tsResult = gulp.src('src/**/*.ts')
    .pipe(ts({
        module: 'CommonJS'
      }));
  return tsResult.js.pipe(gulp.dest('build/'));
});
 
gulp.task('buildFrontEnd', ['cleanBuiltDir'],  function () {
  var tsResult = gulp.src('src/**/*.ts')
    .pipe(ts({
        module: 'CommonJS'
      }));
  return tsResult.js.pipe(gulp.dest('build/'));
});
 
gulp.task('nodemon', function (){
    nodemon({
        script: './build/index.js',
        ext: 'html js ts',
        tasks: ['buildBackEnd', 'buildFrontEnd']
    }).on('restart', function(){
        console.log('nodemon restarted server.js');
    })
})
 
gulp.task('watch', function () {
  gulp.watch('src/**/*.ts', ['buildBackEnd', 'buildFrontEnd'], 'nodemon');
});
 
gulp.task('default', ['buildBackEnd', 'buildFrontEnd']);
