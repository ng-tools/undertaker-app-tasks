# undertaker-app-tasks [![Npm Version](https://img.shields.io/npm/v/undertaker-app-tasks.svg?style=flat)](https://www.npmjs.com/package/undertaker-app-tasks) [![Project Status](https://img.shields.io/badge/status-beta-blue.svg?style=flat)](https://github.com/ng-tools/undertaker-app-tasks)

Bundle of generic [undertaker](https://github.com/phated/undertaker) application tasks, packaged as [undertaker-registry](https://github.com/phated/undertaker-registry) objects.

This module exposes a `{tasks: [Registry...], index: Registry, defaults: Object}` interface that shall be auto-loaded by [ng-factory](https://github.com/ng-tools/ng-factory), it requires a `channels-factory` and defaults to [factory-angular-channels](https://github.com/ng-tools/factory-angular-channels).


## Getting Started

The easiest way to get you started with [ng-factory](https://github.com/ng-tools/ng-factory) is to use the dedicated [generator-ng-factory](https://github.com/ng-tools/generator-ng-factory) that will setup everything for you.

Otherwise, for a manual/custom setup, just install the module and manually register the registries to a take instance with `taker.registry()`

```bash
$ npm i undertaker-app-tasks --save-dev
```

## Communication

- If you **need help**, use [Stack Overflow](http://stackoverflow.com/questions).
- If you'd like to **ask a general question**, use [Stack Overflow](http://stackoverflow.com/questions).
- If you **found a bug**, open an issue.
- If you **have a feature request**, open an issue.
- If you **want to contribute**, submit a pull request.


## Provided tasks

```bash
$ tree -L 1 lib/tasks
lib/tasks
├── clean.js
├── copy.js
├── serve.js
├── views.js
└── watch.js
```


## Copyright and license

    The MIT License

    Copyright (c) 2014-2015 Olivier Louvignes

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
