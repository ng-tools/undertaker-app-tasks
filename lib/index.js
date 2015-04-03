'use strict';
module.exports = {tasks: require('export-files')(__dirname + '/tasks')};

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

module.exports.defaults = {
  paths: {
    cwd: 'app',
    dest: 'dist',
    tmp: '.tmp',
    index: 'index.{html,jade}',
    views: '{views,components/*,modules/*}/**/*.{html,jade}',
    scripts: '{scripts,components/*,modules/*}/**/*.{js,es6,es}',
    styles: '{styles,components/*,modules/*}/{**/*.css,*.less,*.sass,*.scss}',
    images: '{images,components/*,modules/*}/{,*/}*.{jpg,png,svg}',
    fonts: '{fonts,components/*,modules/*}/{,*/}*.{otf,eot,svg,ttf,woff,woff2}',
    config: 'config/*.json'
  },
  ports: {
    src: 9000,
    dist: 8080,
    docs: 9090,
    pages: 8090
  },
  bower: {
    exclude: /jquery|js\/bootstrap/
  }
};
