'use strict';

var util = require('util');
var DefaultRegistry = require('undertaker-registry');
var del = require('del');

function CleanRegistry() {

  DefaultRegistry.call(this);

  this.set('ng:src/clean', function(cb) {
    var paths = this.paths;
    del([paths.tmp]).then(function(res) {
      cb(null, res);
    }).catch(cb);
  });

  this.set('ng:dist/clean', function(cb) {
    var paths = this.paths;
    del([paths.tmp, paths.dest]).then(function(res) {
      cb(null, res);
    }).catch(cb);
  });

}

util.inherits(CleanRegistry, DefaultRegistry);

module.exports = CleanRegistry;
