/* jshint node: true */
'use strict';

var DeployPluginBase = require('ember-cli-deploy-plugin');
var path             = require('path');
var minimatch        = require('minimatch');
var push             = require('couchdb-push');

module.exports = {
  name: 'ember-cli-deploy-couchdb',

  createDeployPlugin: function(options) {
    var DeployPlugin = DeployPluginBase.extend({
      name: options.name,

      defaultConfig: {
        filePattern: '**/*.{js,css,png,gif,ico,jpg,map,xml,txt,svg,swf,eot,ttf,woff,woff2}',
        couchDir: function(context) {
          return context.couchDir;
        },
        db: function(context) {
          return context.db;
        },
        distDir: function(context) {
          return context.distDir;
        },
        distFiles: function(context) {
          return context.distFiles || [];
        }
      },

//      requiredConfig: ['distDir'], // throw an error if this is not configured

      willDeploy: function(context) {
        var distDir = this.readConfig('distDir');
        return {
          couchDir: distDir,
          distDir: distDir + path.sep + '_attachments'
        };
      },

      didBuild: function(context) {
        this.log('write _id and rewrites.json');
      },

      upload: function(context) {
        var filePattern = this.readConfig('filePattern');
        var couchDir    = this.readConfig('couchDir');
        var db          = this.readConfig('db');
        var distDir     = this.readConfig('distDir');
        var distFiles   = this.readConfig('distFiles');

        var filesToUpload = distFiles.filter(minimatch.filter(filePattern, { matchBase: true }));

        // Use the `log` method to generate output consistent with the tree style
        // of ember-cli-deploy's verbose output
        this.log('couchDir: ' + couchDir );
        this.log('distDir: ' + distDir );
        this.log('db: ' + db );
        push(db, couchDir, function(err, resp) {
          // { ok: true }
          this.log('err: ' + err );
          this.log('resp: ' + resp );
        }.bind(this));
      },
    });
    return new DeployPlugin();
  }
};
