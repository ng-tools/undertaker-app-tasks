
# undertaker-app-tasks [![Project Status](https://img.shields.io/badge/status-experimental-orange.svg?style=flat)](https://github.com/ng-tools/undertaker-app-tasks)

Bundle of [undertaker](https://github.com/phated/undertaker) application tasks, packaged as [undertaker-registry](https://github.com/phated/undertaker-registry) objects.

This module exposes a `{tasks: [Registry...], index: Registry, defaults: Object}` interface that shall be auto-loaded by [ng-factory](https://github.com/ng-tools/ng-factory), it requires a `channels-factory` and defaults to [factory-angular-channels](https://github.com/ng-tools/factory-angular-channels).


## Installation

In your ng-factory powered project:

```bash
$ npm install undertaker-app-tasks --save-dev
```

## Tasks

```bash
$ tree -L 1 lib/tasks
lib/tasks
├── clean.js
├── serve.js
├── views.js
└── watch.js
```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
