'use strict';

var util = require('util');
var DefaultRegistry = require('undertaker-registry');
var browserSync = require('browser-sync');
var _ = require('lodash');

function ServeRegistry(taker) {

  DefaultRegistry.call(this);

  this.set('ng:src/serve', function(cb) {
    var paths = this.paths, ports = this.ports;
    browserSync({
      port: ports.src,
      notify: false,
      open: process.argv.indexOf('--no-open') === -1,
      logPrefix: function () {
        return this.compile('[{gray:' + new Date().toLocaleTimeString() + '}] ');
      },
      server: _.defaults(this.server || {}, {
        middleware: this.middleware,
        baseDir: [paths.tmp, paths.cwd]
      })
    }, cb);
  });

  this.set('ng:dist/serve', function(cb) {
    var paths = this.paths, ports = this.ports;
    return browserSync({
      port: ports.dist,
      notify: false,
      open: process.argv.indexOf('--no-open') === -1,
      logPrefix: function () {
        return this.compile('[{gray:' + new Date().toLocaleTimeString() + '}] ');
      },
      server: _.defaults(this.server || {}, {
        middleware: this.middleware,
        baseDir: [paths.dest]
      })
    }, cb);
  });

}

util.inherits(ServeRegistry, DefaultRegistry);

module.exports = ServeRegistry;
