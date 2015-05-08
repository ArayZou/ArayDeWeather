'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var wrench = require('wrench');


var options = {
  src: 'src',
  dist: 'dist',
  tmp: '.tmp',
  e2e: 'e2e',
  errorHandler: function(title) {
    return function(err) {
      gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
      this.emit('end');
    };
  },
  wiredep: {
    directory: 'bower_components',
    exclude: [/foundation\.js/, /foundation\.css/]
  }
};

wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file)(options);
});

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

var ghPages = require('gulp-gh-pages');
var ghPagesOption = {
  remoteUrl:'git@github.com:ArayZou/ArayDeWeather.git'
}
gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages(ghPagesOption));
});

// git subtree push --prefix dist origin gh-pages

//Use Gulp tasks
//
//gulp or gulp build to build an optimized version of your application in /dist
//gulp serve to launch a browser sync server on your source files
//gulp serve:dist to launch a server on your optimized application
//gulp test to launch your unit tests with Karma
//gulp test:auto to launch your unit tests with Karma in watch mode
//gulp protractor to launch your e2e tests with Protractor
//gulp protractor:dist to launch your e2e tests with Protractor on the dist files