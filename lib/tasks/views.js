'use strict';

var util = require('util');
var DefaultRegistry = require('undertaker-registry');
var vfs = require('vinyl-fs');
var merge = require('merge-stream');
var reload = require('browser-sync').reload;
// var plumber = require('gulp-plumber');
var channels = require('gulp-ng-channels');

function ViewsRegistry() {

  DefaultRegistry.call(this);

  this.set('ng:src/views', function(cb) {
    var paths = this.paths;
    var views = vfs.src(paths.views, {cwd: paths.cwd, base: paths.cwd})
      // .pipe(plumber(config.plumberErrorHandler))
      .pipe(channels.views.src.bind(this)())
      .pipe(reload({stream: true}));
    var index = vfs.src(paths.index, {cwd: paths.cwd, base: paths.cwd})
      // .pipe(plumber(config.plumberErrorHandler))
      .pipe(channels.index.src.bind(this)())
      .pipe(reload({stream: true}));
    return merge(views, index);
  });

  this.set('ng:dist/views', function(cb) {
    var paths = this.paths;
    return vfs.src(paths.index, {cwd: paths.cwd, base: paths.cwd})
      .pipe(channels.index.dist.bind(this)());
  });

}

util.inherits(ViewsRegistry, DefaultRegistry);

module.exports = ViewsRegistry;
