/* jshint node: true */
'use strict';

var Promise          = require('ember-cli/lib/ext/promise');
var DeployPluginBase = require('ember-cli-deploy-plugin');
var path             = require('path');
var minimatch        = require('minimatch');

module.exports = {
  name: 'ember-cli-deploy-couchdb',

  createDeployPlugin: function(options) {
    var DeployPlugin = DeployPluginBase.extend({
      name: options.name,

      defaultConfig: {
        filePattern: '**/*.{js,css,png,gif,ico,jpg,map,xml,txt,svg,swf,eot,ttf,woff,woff2}',
        distDir: function(context) {
          return context.distDir;
        },
        distFiles: function(context) {
          return context.distFiles || [];
        }
      },

      requiredConfig: ['awesomeApiKey'], // throw an error if this is not configured

      upload: function(context) {
        var filePattern = this.readConfig('filePattern');
        var distDir     = this.readConfig('distDir');
        var distFiles   = this.readConfig('distFiles');
        
        var filesToUpload = distFiles.filter(minimatch.filter(filePattern, { matchBase: true }));

        // Use the `log` method to generate output consistent with the tree style
        // of ember-cli-deploy's verbose output
        this.log('output some awesomeness');
        this.log('output some red awesomeness', { color: 'red' });
        this.log('output this only when verbose option is enabled', { verbose: true });

        // Need to do something async? You can return a promise.
        // Need to fail out? Throw an error or return a promise which becomes rejected
        return Promise.resolve();
      },
    });
    return new DeployPlugin();
  }
};
