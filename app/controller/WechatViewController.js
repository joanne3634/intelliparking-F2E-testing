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

        router.get('/coupons/parkingPayment', function*(next) {
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

        router.get('/parkingPayment', function*(next) {
            this.body = [{
                carlicense: "京A BC123",
                entranceTimeStamp: "2015/8/21 15:20:00",
                parkingTime: "1小时12分钟",
                overTime: false,
                payment: "20.00",
                coupon: true,
                coupon_id: "Af3322",
                coupon_amount: "5.00",
                paid: "5.00",
                payment_total: "10.00"
            }]
        });

        router.get('/afterCarAuth', function*(next) {
            this.body = [{
                carlicense: "沪A BC123"
            }];
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

        router.get('/parkingRecord/detail', function*(next) {
            this.body = [{
                parkingRecord_id: "BC12345120456",
                carlicense: "京A BC123",
                parkinglot: "陆家嘴国购停车场",
                entranceTimeStamp: "2015/8/21 15:20:00",
                parkingTime: "1小时12分钟",
                preOrder: true,
                invoice: false,
                payment: "20.00",
                coupon_amount: "5.00",
                payment_total: "10.00"
            }]
        });
        router.get('/test',function*(next){
            var parkingRecord_detail = yield this.get('/parkingRecord/detail');
            parkingRecord_detail = JSON.parse(parkingRecord_detail.body);
            console.log( parkingRecord_detail );
        });
    });
}