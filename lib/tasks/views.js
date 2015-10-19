'use strict';

var util = require('util');
var DefaultRegistry = require('undertaker-registry');
var resolveRequire = require('resolve-require');
var vfs = require('vinyl-fs');

function ViewsRegistry(/* options */) {

  DefaultRegistry.call(this);

}

util.inherits(ViewsRegistry, DefaultRegistry);

ViewsRegistry.prototype.init = function(taker) {

  this.set('ng:src/views', function(next) {
    var self = this;

    // Lazy load expensive modules
    var factory = resolveRequire('factory-' + this.factory);
    var reload = require('browser-sync').reload;

    var paths = this.paths;
    taker.parallel(function views() {
      return vfs.src(paths.views, {cwd: paths.cwd, base: paths.cwd})
        .pipe(factory.views.src.bind(self)())
        .pipe(reload({stream: true}));
    }, function index() {
      return vfs.src(paths.index, {cwd: paths.cwd, base: paths.cwd})
        .pipe(factory.index.src.bind(self)())
        .pipe(reload({stream: true}));
    })(next);

  });

  this.set('ng:dist/views', function(next) {
    var self = this;

    // Lazy load expensive modules
    var factory = resolveRequire('factory-' + this.factory);

    var paths = this.paths;
    taker.series(function views() {
      return vfs.src(paths.views, {cwd: paths.cwd, base: paths.cwd})
        .pipe(factory.views.src.bind(self)());
    }, function index() {
      return vfs.src(paths.index, {cwd: paths.cwd, base: paths.cwd})
      .pipe(factory.index.dist.bind(self)());
    })(next);

  });

}

module.exports = ViewsRegistry;
