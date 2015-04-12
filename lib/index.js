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

  var setTask = taker.set || taker._setTask;

  setTask('ng:beforeServe', noop);
  setTask('ng:afterServe', noop);
  setTask('ng:serve', taker.series('ng:beforeServe', 'ng:src/clean', 'ng:src/views', ['ng:src/serve', 'ng:src/watch'], 'ng:afterServe'));

  setTask('ng:beforeBuild', noop);
  setTask('ng:afterBuild', noop);
  setTask('ng:build', taker.series('ng:beforeBuild', 'ng:dist/clean', 'ng:src/views', ['ng:dist/views', 'ng:dist/copy'], 'ng:afterBuild'));

}

util.inherits(IndexRegistry, DefaultRegistry);

module.exports.index = IndexRegistry;
