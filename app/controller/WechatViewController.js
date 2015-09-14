"use strict"
var WechatAPI = require('co-wechat-api'),
    request = require('request'),
    Promise = require('bluebird');

exports = module.exports = function(app) {
    var m = app.models;
    app.group('/wechat-view', function(router) {
        router.get('/coupons/use', function*(next) {
            this.body = [{
                header: "1 hr Free",
                description: "国购停车场限定",
                meta: "Expired Date 2015-12-31",
                images: "/images/85.jpg"
            }, {
                header: "15min Free",
                description: "国购停车场限定",
                meta: "Expired Date 2015-12-31",
                images: "/images/85.jpg"
            }, {
                header: "45min Free",
                description: "国购停车场限定",
                meta: "Expired Date 2015-12-31",
                images: "/images/85.jpg"
            }, {
                header: "2hr Free",
                description: "国购停车场限定",
                meta: "Expired Date 2015-12-31",
                images: "/images/85.jpg"
            }]
        });
        router.get('/coupons/history', function*(next) {
            this.body = [{
                header: "1 hr Free",
                description: "国购停车场限定",
                meta: "Expired Date 2015-12-31",
                images: "/images/95.jpg"
            }, {
                header: "15min Free",
                description: "国购停车场限定",
                meta: "Expired Date 2015-12-31",
                images: "/images/95.jpg"
            }, {
                header: "45min Free",
                description: "国购停车场限定",
                meta: "Expired Date 2015-12-31",
                images: "/images/95.jpg"
            }, {
                header: "2hr Free",
                description: "国购停车场限定",
                meta: "Expired Date 2015-12-31",
                images: "/images/95.jpg"
            }]
        });

        router.get('/parkingRecord/record', function*(next) {
            this.body = [{
                number: "1234567890",
                parkingplace: "陆家嘴国购停车场",
                costtime: "1小时21分钟",
                date: "2015/8/24",
                carlicense: "沪ABC123",
                feed: "¥10.00"
            }, {
                number: "1234567890",
                parkingplace: "陆家嘴国购停车场",
                costtime: "1小时21分钟",
                date: "2015/8/24",
                carlicense: "沪ABC123",
                feed: "¥10.00"
            }, {
                number: "1234567890",
                parkingplace: "陆家嘴国购停车场",
                costtime: "1小时21分钟",
                date: "2015/8/24",
                carlicense: "沪ABC123",
                feed: "¥10.00"
            }, {
                number: "1234567890",
                parkingplace: "陆家嘴国购停车场",
                costtime: "1小时21分钟",
                date: "2015/8/24",
                carlicense: "沪ABC123",
                feed: "¥10.00"
            }]
        });
    });
}
