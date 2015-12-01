/* jshint node: true */
'use strict';

var DeployPluginBase = require('ember-cli-deploy-plugin');
var path             = require('path');
var push             = require('couchdb-push');
var fs               = require('fs');
var Promise          = require('ember-cli/lib/ext/promise');

module.exports = {
  name: 'ember-cli-deploy-couchdb',

  createDeployPlugin: function(options) {
    var DeployPlugin = DeployPluginBase.extend({
      name: options.name,

      defaultConfig: {
        couchDir: function(context) {
          return context.couchDir;
        },
        db: function(context) {
          return context.db;
        },
        ddocname: function(context) {
          return context.ddocname || context.project.name();
        },
        couchappignore: function(context) {
          return context.couchappignore || [];
        },
        distDir: function(context) {
          return context.distDir;
        },
        distFiles: function(context) {
          return context.distFiles || [];
        }
      },

//      requiredConfig: ['distDir'], // throw an error if this is not configured

      willDeploy: function(/* context */) {
        var distDir = this.readConfig('distDir');
        return {
          couchDir: distDir,
          distDir: distDir + path.sep + '_attachments'
        };
      },

      didBuild: function(/* context */) {
        var couchDir       = this.readConfig('couchDir');
        var db             = this.readConfig('db');
        var ddocname       = this.readConfig('ddocname');
        var distFiles      = this.readConfig('distFiles');
        var couchappignore = this.readConfig('couchappignore');

        this.log('couchDir   : ' + couchDir );
        db = db.replace( /\/\/.*\@/g ,'//'); // Strip username, password
        this.log("Visit      : " + db + "/_design/" + ddocname + "/_rewrite/ or vhost");
        db = db.replace( /^.*\/\/.*\//g ,'/'); // Strip domain
        this.log("ENV.baseURL: '" + db + "/_design/" + ddocname + "/_rewrite/' or '/'");

        distFiles.sort();
        var previous = "";
        var rewrites = [];

        distFiles.forEach(function (item) {
          if (item === 'index.html') {
            return;
          }
          item = item.replace( /\/.*$/g ,'/*');
          if (item !== previous) {
            rewrites.push(
              {
                "from": item,
                "to": item,
                "method": "GET"
              }
            );
            previous = item;
          }
        }.bind(this));

        rewrites.push(
          {
            "from": "*",
            "to": "index.html",
            "method": "GET"
          },
          {
            "from": "",
            "to": "index.html",
            "method": "GET"
          }
        );

        fs.writeFileSync(couchDir + path.sep + "_id", "_design/" + ddocname);
        fs.writeFileSync(couchDir + path.sep + "rewrites.json", JSON.stringify(rewrites));
        fs.writeFileSync(couchDir + path.sep + ".couchapprc", "{}");
        fs.writeFileSync(couchDir + path.sep + ".couchappignore", JSON.stringify(couchappignore));
      },

      upload: function(/* context */) {
        var couchDir    = this.readConfig('couchDir');
        var db          = this.readConfig('db');

        this.log('Start Upload');
        var promise = new Promise(function(resolve, reject) {
          push(db, couchDir, function(error, response) {
            if(error) {
              this.log(error + ' ' + response);
              reject(error);
            } else {
              this.log('OK');
              resolve('OK');
            }
          }.bind(this));
        }.bind(this));
        return promise;
      },
    });
    return new DeployPlugin();
  }
};
