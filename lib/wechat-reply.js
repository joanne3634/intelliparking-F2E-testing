"use strict"

var debug = require('debug')('eskygo:intelliparking:wechat-reply');
var wechat = require('co-wechat');

exports = module.exports = function(token) {

    return wechat(token).middleware(function *() {
        var message = this.weixin;
        if (message.MsgType === 'event') {
            console.log(message);
            if ( message.Event.toLowerCase() === "subscribe" ) {
                // 用户关注时自动回复
                this.body = {
                    content: 'eGo停车为您服务！\n即刻登录马上获得10元无限制抵价券，并有更多优惠供您享！\n<a href="http://www.baidu.com">马上登录！</a>',
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
        }
    });
};