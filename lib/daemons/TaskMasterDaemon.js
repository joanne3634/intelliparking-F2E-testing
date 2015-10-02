"use strict";
var Daemon = require("../daemon/index.js");
var App = require('../../index.js');

class TaskMasterDaemon extends Daemon {
	constructor(options){
		super('CupPullDaemon', options);
		this.maxSleep = 1000*60*2;	// lets make max sleep time 2min
	}
	runner() {
		var self = this;
		// get jobs one by one, and limit it by a number of concurrently running workers
		var app = this._app;
		function runLease() {

			var jobModel, db = app._orm._db;
			return db.update('IPWorkerLease')
					 .where('status in ["retrying", "pending"] and next_run <= sysdate()')
					 .set({'status': 'processing', 'updated_at': Date.now()})
					 .return('after')
					 .limit(1)
					 .one()
				.then(function(model){
					console.log(model);
					if ( undefined === model ) { // no job to run, let daemon rest
						return Promise.reject(null);
					}
					jobModel = model;
					console.log(jobModel);
					if ( !require('util').isString(jobModel.job)) {
						return Promise.reject("jobModel.job is not a string"+jobModel['@rid']);
					}
					var jobPath, jobClass;
					try {
						jobPath = require('path').join(process.cwd(), jobModel.job);
						jobClass = require(jobPath);
					} catch(e) {
						console.log(e, e.stack);
						return Promise.reject(e);
					}
					var job = new jobClass(JSON.parse(model.data), app);
					return job.run().then(function(complete){
						return [jobModel, complete];
					});

				}).spread(function(jobModel, complete){
					if ( jobModel ) {
						return db.update(jobModel['@rid']).set({status: 'completed'}).exec();
					}
					return Promise.resolve(complete);
				}).catch(function(err){
					if ( err === null ) {
						console.log('short circuiting daemon');
						return Promise.resolve(null);
					}
					if ( err ) {
						console.log(err, err.stack);
					}
					return Promise.reject(true);
				})
		}
		return runLease().then(function(r){
			if ( r !== null ) {
				self.sleep(100);
			}
			return Promise.resolve(true);
		})
		//concurrent hits seems to murder the pg
		// var leases = [];
		// for ( var i = 0; i < 5; i++ ) {
		// 	leases.push(runLease());
		// }
		// return Promise.all(leases).then(function(results){
		// 	if ( !results.every(function(e){return e === null;}) ) {
		// 		self.sleep(100);
		// 	}
		// 	return Promise.resolve(true);
		// });
	}
	run() {
		var app = this._app, self = this;;
		if ( !app ) {
			app = new App();
			console.log('running from this');
			return app.start(undefined, true).then(function(app){
				self._app = app;
				return self.runner();
			}).catch(function(err){
                console.log(err.stack);
                return Promise.reject(err);
            })
		}
		console.log('running from here');
		return self.runner();
	}
}

module.exports = TaskMasterDaemon;
