'use strict';

module.exports = {
  type: 'application',
  factory: 'angular-channels',
  sourcemaps: true,
  paths: {
    cwd: 'app',
    dest: 'dist',
    tmp: '.tmp',
    index: 'index.{html,jade}',
    views: ['{views,components/*,modules/*}/**/*.{html,jade}', '*.{html,jade}', '!index.{html,jade}'],
    scripts: ['{scripts,pipes,filters,services,directives,models,components/*,modules/*}/**/*.{js,es6,es,ts}', '*.{js,es6,es,ts}', '!cordova.js', '!cordova_plugins.js'],
    // styles: ['{styles,components/*,modules/*}/**/[^_]*.{less,sass,scss}', '[^_]*.{less,sass,scss}', '{styles,components/*,modules/*}/**/*.css', '*.css'],
    styles: ['styles/[^_]*.{less,sass,scss}', '[^_]*.{less,sass,scss}', '{styles,components/*,modules/*}/**/*.css', '*.css'],
    watchStyles: ['{styles,components/*,modules/*}/**/*.{css,less,sass,scss}', '*.{less,sass,scss}'],
    images: '{images,components/*,modules/*}/**/*.{jpg,png,svg}',
    fonts: '{fonts,components/*,modules/*}/{,*/}*.{otf,eot,svg,ttf,woff,woff2}',
    files: '{config,components/*,modules/*}/**/*.json'
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
