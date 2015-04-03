'use strict';

module.exports = {
  tasks: require('export-files')(__dirname + '/tasks'),
  defaults: require('./defaults')
};

var util = require('util');
var DefaultRegistry = require('undertaker-registry');
function noop(cb) { cb(); }

function IndexRegistry(taker) {

  DefaultRegistry.call(this);

  taker.set('ng:beforeServe', noop);
  taker.set('ng:afterServe', noop);
  taker.set('ng:serve', taker.series('ng:beforeServe', 'ng:src/clean', 'ng:src/views', ['ng:src/serve', 'ng:src/watch'], 'ng:afterServe'));

  taker.set('ng:beforeBuild', noop);
  taker.set('ng:afterBuild', noop);
  taker.set('ng:build', taker.series('ng:beforeBuild', 'ng:dist/clean', 'ng:src/views', ['ng:dist/views', 'ng:dist/copy'], 'ng:afterBuild'));

}

util.inherits(IndexRegistry, DefaultRegistry);

module.exports.index = IndexRegistry;
