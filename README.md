# Ember-cli-deploy-couchdb

> An ember-cli-deploy plugin to upload files to CouchDB

This plugin uploads an Ember App to a CouchDB design doc. The Ember App is served directly to the browser from CouchDB, without any other software in the stack.

## What is an ember-cli-deploy plugin?

A plugin is an addon that can be executed as a part of the ember-cli-deploy pipeline. A plugin will implement one or more of the ember-cli-deploy's pipeline hooks.

For more information on what plugins are and how they work, please refer to the [Plugin Documentation][1].

## Quick Start

To get up and running quickly, do the following:

- Ensure [ember-cli-deploy-build][2] is installed and configured.

- Install this plugin

```bash
$ ember install ember-cli-deploy-couchdb
```

- Place the following configuration into `config/deploy.js`

```javascript
ENV.couchdb = {
  db: 'http://localhost:5984/emberapp'
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

The root directory where the files will be searched for. By default, this option will use the `distDir` property of the deployment context, provided by [ember-cli-deploy-build][2].

*Default:* `context.distDir`

## Prerequisites

The following properties are expected to be present on the deployment `context` object:

- `distDir`      (provided by [ember-cli-deploy-build][2])

## Running Tests

- `npm test`

[1]: http://ember-cli.github.io/ember-cli-deploy/plugins "Plugin Documentation"
[2]: https://github.com/ember-cli-deploy/ember-cli-deploy-build "ember-cli-deploy-build"
