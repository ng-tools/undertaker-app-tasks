'use strict';

module.exports = {
  type: 'application',
  factory: 'angular-channels',
  paths: {
    cwd: 'app',
    dest: 'dist',
    tmp: '.tmp',
    index: 'index.{html,jade}',
    views: '{views,components/*,modules/*}/**/*.{html,jade}',
    scripts: '{scripts,components/*,modules/*}/**/*.{js,es6,es}',
    styles: '{styles,components/*,modules/*}/{**/*.css,*.less,*.sass,*.scss}',
    images: '{images,components/*,modules/*}/**/*.{jpg,png,svg}',
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
