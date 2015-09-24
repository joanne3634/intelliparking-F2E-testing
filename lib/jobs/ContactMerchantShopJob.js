"use strict";
// TODO: consider breaking file into multiple pieces in the future
// and perhaps stream it up to s3 for multi-process/machine processing

var Job = require('../job'),
	debug = require('debug')('eskygo:job:ContactMerchantShopJob'),
	csv = require('csv'),
	moment = require('moment');

var Mailer = require('../mailer')
var readYaml = require('read-yaml');


class ContactMerchantShopJob extends Job {
	constructor(options, app) {
		super(options, app);
		this.data = options;
		this.name = "ContactMerchantShopJob";
		debug(`creating ${this.name}`);
		var self = this;
		this.config = readYaml.sync(require('path').resolve('./config/mailer.yml'))[app._app.env];
		this.mailer = new Mailer(this.config);
	}
	runner() {
		var app = this._app;
		var m = app.models;
		var merchantServ = app.services('eskygo-merchant-service');
		// var oriento = app._orm._db;
		var dust = app._dust;
		var api = this.api;
		var self = this;
		return m.Dian13MerchantShop.findById(this.data.shop.rid || this.data.shop)
			.exec()
			.then(function(shop){
				// right now we do not support mobile, so, retrieve openid
				return Promise.all([shop, merchantServ.get(`/shops/${shop.eskygo_merchant_shop_id}/contacts/primary`, {type: 'email'})]);
			}).spread(function(shop, primary){
				if ( 200 !== primary.status ) {
					debug("There is an error while trying to find the primary", primary.status, primary.body);
					return Promise.reject(null);
				}
				var primary = JSON.parse(primary.body);

				return Promise.all([primary, dust.render(self.data.template, {data: self.data, shop: shop, primary: primary})]);
			}).spread(function(primary, template){
				// found an openid for wechat 13dian
				console.log('sending mail now with', self.config.auth.user, primary.val, self.data.title, template);
				return self.mailer.sendMail(self.config.auth.user, primary.val, self.data.title, template);
			}).catch(function(err){
				if ( null === err ) {
					debug("These are purposely skipped");
					return Promise.resolve(null);
				}
				return Promise.reject(err);
			});
	}
}

module.exports = ContactMerchantShopJob;
