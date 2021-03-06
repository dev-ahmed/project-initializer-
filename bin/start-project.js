#!/usr/bin/env node

var lib = require('../lib/index.js');
var currentDirectory = lib.getPath();
var queue = require('../lib/queue');
var _ = require('lodash');
var packages = require('../lib/packages');
var scripts = require('../lib/scripts');
var eslintConfigs = require('../lib/eslintrcConfig');

_.each(packages, function (package, index) {
  queue.add(lib.installDeps(package));
  if (packages.length === index + 1) {
    queue.run();
  }
});

_.each(scripts, function (script, index) {
  queue.add(lib.addScript(script.key, script.value));
  if (scripts.length === index + 1) {
    queue.run();
  }
})

lib.createJsonFile('.eslintrc', eslintConfigs)
