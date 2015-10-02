"use strict";
// TODO: consider breaking file into multiple pieces in the future
// and perhaps stream it up to s3 for multi-process/machine processing

var Job = require('../job'),
	debug = require('debug')('eskygo:job:ContactUserJob'),
	csv = require('csv'),
	moment = require('moment');

var wechatAPI = require('co-wechat-api');
var readYaml = require('read-yaml');

class ContactUserJob extends Job {
	constructor(options, app) {
		super(options, app);
		this.data = options;
		this.name = "ContactUserJob";
		debug(`creating ${this.name}`);
		var self = this;
		this.config = readYaml.sync(require('path').resolve('./config/wechat.yml'))[app._app.env];
		this.api = new wechatAPI(this.config.appId, this.config.appSecret);
	}
	runner() {
		var app = this._app;
		var m = app.models;
		var userServ = app.services('eskygo-user-service');
		// var oriento = app._orm._db;
		var dust = app._dust;
		var api = this.api;
		var self = this;
		//return m.Dian13User.findById(this.data.user.rid || this.data.user)
		//	.exec()
		//	.then(function(user){
		//		// right now we do not support mobile, so, retrieve openid
		//		return Promise.all([user, userServ.get(`/users/${user.eskygo_user_id}/aliases/openid`, {provider: '13dian:wechat'})]);
		//	}).spread(function(user, alias){
		//		if ( 200 !== alias.status ) {
		//			debug("There is an error while trying to find the alias", alias.status, alias.body);
		//			return Promise.reject(null);
		//		}
		//		var alias = JSON.parse(alias.body);
		//		alias = alias[0];
		//		if ( !alias ) {
		//			debug("We couldnt find any matching alias");
		//			return Promise.reject(null);
		//		}
		//		return Promise.all(['park:wechat', alias, dust.render(self.data.template, {data: self.data, user: user, alias: alias})]);
		//	}).spread(function(platform, data, template){
		//		// found an openid for wechat 13dian
		//
		//		if ( 'park:wechat' === platform ) {
		//			return new Promise(function(resolve, reject){
		//				self.api.sendText(data.alias, template, function(err, result){
		//					if ( err ) {
		//						return reject(err);
		//					}
		//					debug("we succeeded in making the message!", result);
		//					return resolve(result);
		//				})
		//			});
		//		}
		//	}).catch(function(err){
		//		if ( null === err ) {
		//			debug("These are purposely skipped");
		//			return Promise.resolve(null);
		//		}
		//		return Promise.reject(err);
		//	});
	}
}

module.exports = ContactUserJob;
