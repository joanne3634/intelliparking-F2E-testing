"use strict";
// TODO: consider breaking file into multiple pieces in the future
// and perhaps stream it up to s3 for multi-process/machine processing

var Job = require('../job'),
	debug = require('debug')('eskygo:job:GCJob'),
	csv = require('csv'),
	moment = require('moment'),
	Promise = require('bluebird');

var wechatAPI = require('wechat-api');
var readYaml = require('read-yaml');

class GCJob extends Job {
	constructor(options, app) {
		super(options, app);
		this.data = options;
		this.name = "GCJob";
		this.sleepTime = 5*60*1000;
		debug(`creating ${this.name}`);
		var self = this;
	}
	runner() {
		var app = this._app;
		var db = app._orm._db;
		var twoweeksago = moment().subtract(2, 'weeks').startOf('day');
		var fiveminago = moment().subtract(5,'minutes');
		return Promise.all([db.delete('VERTEX', 'IPJobEvent')
				 .where(`created_at <= ${twoweeksago.valueOf()}`)
				 .limit(100)
				 .exec()
				 .then(function(count){
				 	if ( count <= 0 ) {
				 		return Promise.resolve(null); // sleep time
				 	}
				 }),
				 db.update('IPWorkerLease')
				 	.where(`updated_at <= ${fiveminago.valueOf()} AND status="processing" `)
				 	.set({status: "retrying"})
				 	.increment("retries", 1)
				 	.limit(100)
				 	.exec()
				 ]).spread(function(removed, retrying){
				 	if ( null === removed && null === retrying ) {
				 		return Promise.resolve(null);
				 	}
				 });
	}
}

module.exports = GCJob;
