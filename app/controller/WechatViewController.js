"use strict"
var WechatAPI = require('co-wechat-api'),
    request = require('request'),
    Promise = require('bluebird');

exports = module.exports = function(app) {
    var m = app.models;
    app.group('/wechat-view', function(router) {
        router.get('/car', function*(next){
            yield this.render('wechat-view/car.html', {token:this.query['t']});
        });
    });

}
