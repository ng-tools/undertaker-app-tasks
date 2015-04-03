'use strict';
module.exports = {tasks: require('export-files')(__dirname + '/tasks')};

var util = require('util');
var DefaultRegistry = require('undertaker-registry');

function IndexRegistry(taker) {

  DefaultRegistry.call(this);

  taker.set('ng:serve', taker.series('ng:src/clean', 'ng:src/views', ['ng:src/serve', 'ng:src/watch'], function(cb) {
    cb();
  }));

}

util.inherits(IndexRegistry, DefaultRegistry);

module.exports.index = IndexRegistry;


