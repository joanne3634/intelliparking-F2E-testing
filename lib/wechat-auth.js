"use strict"

var debug = require('debug')('eskygo:intelliparking:wechat-auth');

exports = module.exports = function() {
    return function(req, openid, unionid, profile, token, done) {
        var self = this;
        const openidProvider = 'park:wechat', unionidProvider = 'wechat';
        debug("replied with arguments", arguments);

        //这里处理登录绑定的逻辑，待添加

        var body = {};

        return done(null, body, null);
    };
};