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

  var setTask = (taker.set || taker._setTask).bind(taker);

  setTask('ng:serve', taker.series('ng:src/clean', 'ng:src/views', taker.parallel('ng:src/serve', 'ng:src/watch')));
  setTask('ng:build', taker.series('ng:dist/clean', taker.parallel('ng:dist/views', 'ng:dist/copy')));

}

util.inherits(IndexRegistry, DefaultRegistry);

module.exports.index = IndexRegistry;
