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

  taker._setTask('ng:beforeServe', noop);
  taker._setTask('ng:afterServe', noop);
  taker._setTask('ng:serve', taker.series('ng:beforeServe', 'ng:src/clean', 'ng:src/views', ['ng:src/serve', 'ng:src/watch'], 'ng:afterServe'));

  taker._setTask('ng:beforeBuild', noop);
  taker._setTask('ng:afterBuild', noop);
  taker._setTask('ng:build', taker.series('ng:beforeBuild', 'ng:dist/clean', 'ng:src/views', ['ng:dist/views', 'ng:dist/copy'], 'ng:afterBuild'));

}

util.inherits(IndexRegistry, DefaultRegistry);

module.exports.index = IndexRegistry;
