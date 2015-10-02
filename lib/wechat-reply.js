"use strict"

var debug = require('debug')('eskygo:intelliparking:wechat-reply');
var wechat = require('co-wechat');

exports = module.exports = function(token,domain) {

    return wechat(token).middleware(function *() {
        var message = this.weixin;
        if (message.MsgType === 'event') {
            console.log(message);
            if ( message.Event.toLowerCase() === "subscribe" ) {
                // 用户关注时自动回复
                this.body = {
                    content: '欢迎关注一哥停车！\n即刻登录一哥停车，马上获得10元储值金，并有更多优惠供您享：\n<a href="' + domain + '/wechat/action?toUrl=/users/car">马上登录！</a>',
                    type: 'text'
                };
                return this.status = 200;
            }
            if ( message.Event.toLowerCase() === 'scan' || message.Event.toLowerCase() === "subscribe" ) {

                console.log(message.FromUserName);
                //用户通过QR Code 扫描关注

            }
        } else if (message.MsgType === 'text') {
            //用户输入任意字符
            this.body = {
                content: '一哥停车为您服务！\n即刻登录马上获得10元储值金，并有更多优惠供您享！\n<a href="' + domain + '/wechat/action?toUrl=/users/car">马上登录！</a>',
                type: 'text'
            };
            return this.status = 200;
        }
    });
};