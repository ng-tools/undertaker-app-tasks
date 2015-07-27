'use strict';

var util = require('util');
var path = require('path');
var DefaultRegistry = require('undertaker-registry');
var vfs = require('vinyl-fs');
var chalk = require('chalk');
var resolveRequire = require('resolve-require');
function WatchRegistry(taker) {

  function watchErrorHandler(error) {
    console.log('[' + chalk.grey(new Date().toLocaleTimeString()) + '] ' + error.toString());
  }

  function getRelativeFilePath(file, cwd) {
    return file.path.replace(path.join(process.cwd(), cwd), '').substr(1);
  }

  DefaultRegistry.call(this);

  this.set('ng:src/watch', function() {

    // Lazy load expensive modules
    var factory = resolveRequire('factory-' + this.factory);
    var browserSync = require('browser-sync');
    var reload = browserSync.reload;

    var self = this, paths = this.paths;
    vfs.watch(paths.scripts, {cwd: paths.cwd}).on('change', function(file) {
      return vfs.src(getRelativeFilePath(file, paths.cwd), {cwd: paths.cwd, base: paths.cwd})
        .pipe(factory.scripts.src.bind(self)())
        .on('error', watchErrorHandler)
        .pipe(reload({stream: true}));
    });
    // Always watch all styles files
    vfs.watch(paths.styles.map(function(filepath) { return filepath.replace(/([,{/])(\*\.)/g, '$1**/*.'); }), {cwd: paths.cwd}, function(files) {
      // But only process root styles files
      return vfs.src(paths.styles, {cwd: paths.cwd})
        .pipe(factory.styles.src.bind(self)())
        .on('error', watchErrorHandler)
        .pipe(reload({stream: true}));
    });
    vfs.watch(paths.index, {cwd: paths.cwd}, function() {
      return vfs.src(paths.index, {cwd: paths.cwd})
        .pipe(factory.index.src.bind(self)())
        .on('error', watchErrorHandler)
        .pipe(reload({stream: true}));
    });
    vfs.watch(paths.views, {cwd: paths.cwd}).on('change', function(file) {
      return vfs.src(getRelativeFilePath(file, paths.cwd), {cwd: paths.cwd, base: paths.cwd})
        .pipe(factory.views.src.bind(self)())
        .on('error', watchErrorHandler)
        .pipe(reload({stream: true}));
    });
  });

}

util.inherits(WatchRegistry, DefaultRegistry);

module.exports = WatchRegistry;
