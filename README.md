# Ember-cli-deploy-couchdb

> An ember-cli-deploy plugin to upload files to CouchDB

[![](https://ember-cli-deploy.github.io/ember-cli-deploy-version-badges/plugins/ember-cli-deploy-couchdb.svg)](http://ember-cli-deploy.github.io/ember-cli-deploy-version-badges/)

This plugin uploads an Ember App to a CouchDB design doc. The Ember App is served directly to the browser from CouchDB, without any other software in the stack.

## What is an ember-cli-deploy plugin?

A plugin is an addon that can be executed as a part of the ember-cli-deploy pipeline. A plugin will implement one or more of the ember-cli-deploy's pipeline hooks.

For more information on what plugins are and how they work, please refer to the [Plugin Documentation][1].

## Quick Start

To get up and running quickly, do the following:

- Ensure [ember-cli-deploy-build-plus][2] is installed and configured, or if you need to use [ember-cli-deploy-build][5], that you have the additional configurations described below in place.

- Install this plugin

```bash
$ ember install ember-cli-deploy-couchdb
```

- Place the following configuration into `config/deploy.js`

```javascript
ENV.couchdb = {
  db: 'http://localhost:5984/emberapp'

  // optionally, if you are using ember-cli-deploy-build instead of
  // ember-cli-deploy-build-plus, also include the following

  // ddocname: emberapp,
  // couchDir: 'tmp/deploy-dist',
  // distDir: 'tmp/deploy-dist/_attachments'
}
```

If you are using ember-cli-deploy-build, you will also need to add the following to your build hook
```javascript
ENV.build = {
  outputPath: 'tmp/deploy-dist/_attachments'
}
```

- Place the following configuration into `config/environment.js` where `ddocname` is normaly the same as `modulePrefix:`. `ddocname` can be changed in the configuration options.

```javascript
if (environment === 'production') {
  ENV.rootURL = '/emberapp/_design/ddocname/_rewrite/';
}
```

If a [vhost][3] is used do the following:

```javascript
if (environment === 'production') {
  ENV.rootURL = '/';
}
```

- Run the pipeline

```bash
$ ember deploy
```

## Installation
Run the following command in your terminal:

```bash
ember install ember-cli-deploy-couchdb
```

## ember-cli-deploy Hooks Implemented

For detailed information on what plugin hooks are and how they work, please refer to the [Plugin Documentation][1].

- `configure`
- `willDeploy`
- `didBuild`
- `upload`

## Configuration Options

For detailed information on how configuration of plugins works, please refer to the [Plugin Documentation][1].

### db (`required`)

The CouchDB URL
 - `'http://localhost:5984/emberapp'`
 - `'https://username:password@martinic.cloudant.com/emberapp'`

*Default:* `undefined`

### ddocname

The Ember App is uploaded to the ddocname URL as `_design/ddocname`.

*Default:* `context.project.name()`

### couchappignore

Array of regexps for files to skip upload.

*Default:* `[]`

### distDir

The root directory where the files will be searched for. By default, this option will use the `distDir` property of the deployment context, provided by [ember-cli-deploy-build-plus][2].

*Default:* `context.distDir`

## Prerequisites

The following properties are expected to be present on the deployment `context` object:

- `distDir`      (provided by [ember-cli-deploy-build-plus][2])

## Issues

You can use the [issue tracker][4] to provide feedback, suggest features or report bugs.

- If you get `Assertion failed: end <= source_len, file src\smalloc.cc, line 280` you are using node.js v0.12 or io.js v1.3.0. These  versions have a bug with Buffers. Upgrade to a newer or older version.

## Running Tests

- `npm test`

[1]: http://ember-cli-deploy.com/ "Plugin Documentation"
[2]: https://github.com/martinic/ember-cli-deploy-build-plus "ember-cli-deploy-build-plus"
[3]: https://wiki.apache.org/couchdb/Virtual_Hosts "vhost"
[4]: https://github.com/martinic/ember-cli-deploy-couchdb/issues "issue tracker"
[5]: https://github.com/ember-cli-deploy/ember-cli-deploy-build "ember-cli-deploy-build"
