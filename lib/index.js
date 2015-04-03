'use strict';

module.exports = require('require-dir')('./tasks');

var util = require('util');
var DefaultRegistry = require('undertaker-registry');

function IndexRegistry(taker) {

  DefaultRegistry.call(this);

  taker.set('ng:serve', taker.series('ng:src/clean', 'ng:src/views', ['ng:src/serve', 'ng:src/watch'], function(cb) {
    d('served!');
    cb();
  }));

}

util.inherits(IndexRegistry, DefaultRegistry);

module.exports.index = IndexRegistry;


