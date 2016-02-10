'use strict';

var util = require('util');
var path = require('path');
var DefaultRegistry = require('undertaker-registry');
var vfs = require('vinyl-fs');
var watch = require('gulp-watch');
var chalk = require('chalk');
var resolveRequire = require('resolve-require');
var log = require('./../helpers/log');
var gulpif = require('gulp-if');

function WatchRegistry(/* taker */) {

  DefaultRegistry.call(this);

  this.set('ng:src/watch', function() {
    var self = this;

    // Lazy load expensive modules
    var factory = resolveRequire('factory-' + this.factory);
    var bs = require('browser-sync');

    var paths = this.paths;
    watch(paths.scripts, {cwd: paths.cwd}, function(file) {
      return vfs.src(getRelativeFilePath(file, paths.cwd), {cwd: paths.cwd, base: paths.cwd})
        .pipe(factory.scripts.src.bind(self)())
        .on('error', watchErrorHandler)
        .pipe(bs.reload({stream: true}));
    });
    // Always watch all styles files
    watch(paths.watchStyles || paths.styles, {cwd: paths.cwd}, function() {
      // But only process root styles files
      return vfs.src(paths.styles, {cwd: paths.cwd, base: paths.cwd})
        .pipe(factory.styles.src.bind(self)())
        .on('error', watchErrorHandler)
        .pipe(gulpif('*.css', bs.reload({stream: true})));
        // .pipe(bs.stream({match: '**/*.css'}));
        // .pipe(bs.reload({stream: true, match: '**/*.css'}));
    });
    watch(paths.index, {cwd: paths.cwd}, function() {
      return vfs.src(paths.index, {cwd: paths.cwd, base: paths.cwd})
        .pipe(factory.index.src.bind(self)())
        .on('error', watchErrorHandler)
        .pipe(bs.reload({stream: true}));
    });
    watch(paths.views, {cwd: paths.cwd}, function(file) {
      return vfs.src(getRelativeFilePath(file, paths.cwd), {cwd: paths.cwd, base: paths.cwd})
        .pipe(factory.views.src.bind(self)())
        .on('error', watchErrorHandler)
        .pipe(bs.reload({stream: true}));
    });
  });

}

util.inherits(WatchRegistry, DefaultRegistry);

module.exports = WatchRegistry;

function watchErrorHandler(error) {
  log(chalk.red(error.toString()));
}

function getRelativeFilePath(file, cwd) {
  return file.path.replace(path.join(process.cwd(), cwd), '').substr(1);
}
