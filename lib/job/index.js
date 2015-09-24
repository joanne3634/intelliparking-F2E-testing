"use strict";
var debug = require('debug')('eskygo:job');
var env = process.env.NODE_ENV || "development";
class Job {
	constructor(options, app) {
		this._options = options;
		this._app = app;
	}
	last(event) {
		return this._app.models.Dian13JobEvent.where({
			env: env,
			name: this.name, 
			event: event
		}).fetch();
	}
	run() {
		debug("executing job");
		var self = this;
		var app = this._app;
		return new Promise(function(sResolve, sReject){
			var JobEvent = app.models.Dian13JobEvent;
			return new Promise(function(resolve, reject){
				debug("schedule runner beginning");
				self.runner(app).then(function(result){
					debug("schedule success");
					JobEvent.create({
						pid: process.pid,
						name: self.name,
						machine: require('os').hostname(),
						env: env,
						message: "",
						event: 'success',
						os: require('os').release(),
						runningAs: process.getuid && process.getuid()
					}).then(function(){
						resolve(result);
					});
				}).catch(function(e){
					debug("schedule failed", e, e.stack);
					JobEvent.create({
						pid: process.pid,
						name: self.name,
						machine: require('os').hostname(),
						env: env,
						event: 'failed',
						os: require('os').release(),
						message: e.message,
						runningAs: process.getuid && process.getuid()
					}).then(function(){
						reject(e.stack);
					});
				});
			}).then(sResolve, sReject);
		})
	}
}

module.exports = Job;