var path = require('path').resolve(process.cwd() + '/index.js');
var TestApp = require(path);
var App = new TestApp();
App.start();
