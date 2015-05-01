'use strict';

var util = require('util');
var DefaultRegistry = require('undertaker-registry');
var vfs = require('vinyl-fs');
var merge = require('merge-stream');
var resolveRequire = require('resolve-require');

function ViewsRegistry() {

  DefaultRegistry.call(this);

  this.set('ng:src/views', function(cb) {

    // Lazy load expensive modules
    var factory = resolveRequire('factory-' + this.factory);
    var reload = require('browser-sync').reload;

    var paths = this.paths;
    var views = vfs.src(paths.views, {cwd: paths.cwd, base: paths.cwd})
      .pipe(factory.views.src.bind(this)())
      .pipe(reload({stream: true}));
    var index = vfs.src(paths.index, {cwd: paths.cwd, base: paths.cwd})
      .pipe(factory.index.src.bind(this)())
      .pipe(reload({stream: true}));
    return merge(views, index);

  });

  this.set('ng:dist/views', function(cb) {

    // Lazy load expensive modules
    var factory = resolveRequire('factory-' + this.factory);

    var paths = this.paths;
    return vfs.src(paths.index, {cwd: paths.cwd, base: paths.cwd})
      .pipe(factory.index.dist.bind(this)());

  });

}

util.inherits(ViewsRegistry, DefaultRegistry);

module.exports = ViewsRegistry;
