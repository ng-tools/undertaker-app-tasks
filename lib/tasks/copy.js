'use strict';

var util = require('util');
var DefaultRegistry = require('undertaker-registry');
var vfs = require('vinyl-fs');

function CopyRegistry() {

  DefaultRegistry.call(this);

  this.set('ng:dist/copy', function() {
    var paths = this.paths;
    return vfs.src(['favicon.ico', paths.images, paths.fonts, paths.files], {cwd: paths.cwd, base: paths.cwd, allowEmpty: true})
      .pipe(vfs.dest(paths.dest));
  });

}

util.inherits(CopyRegistry, DefaultRegistry);

module.exports = CopyRegistry;
