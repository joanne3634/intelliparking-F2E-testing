"use strict"

var debug = require('debug')('eskygo:intelliparking:wechat-reply');
var wechat = require('co-wechat');

exports = module.exports = function(token) {

    return wechat(token).middleware(function *() {
        var message = this.weixin;
        if (message.MsgType === 'event') {
            console.log(message);
            if ( message.Event.toLowerCase() === "subscribe" ) {
                //用户关注时自动回复
                //this.body = [{
                //    title: 'xxxx',
                //    description: 'xxxx',
                //    picurl: domain + 'uri',
                //    url: domain + 'uri'
                //}];
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