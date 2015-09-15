"use strict"
var WechatAPI = require('co-wechat-api'),
    request = require('request'),
    Promise = require('bluebird');

exports = module.exports = function(app) {
    var m = app.models;
    app.group('/wechat-view', function(router) {
        router.get('/coupons', function*(next) {
            this.body = [{
                header: "1 hr Free",
                usedStatus: false,
                description: "国购停车场限定",
                meta: "2015-12-31 12:00AM",
                images: "kuogo_logo.png"
            }, {
                header: "15min Free",
                usedStatus: false,
                description: "国购停车场限定",
                meta: "2015-12-31 12:00AM",
                images: "kuogo_logo.png"
            }, {
                header: "45min Free",
                usedStatus: false,
                description: "国购停车场限定",
                meta: "2015-12-31 12:00AM",
                images: "kuogo_logo.png"
            }, {
                header: "2hr Free",
                usedStatus: false,
                description: "国购停车场限定",
                meta: "2015-12-31 12:00AM",
                images: "kuogo_logo.png"
            },{
                header: "1 hr Free",
                usedStatus: true,
                description: "国购停车场限定",
                meta: "2015-12-31 12:00AM",
                images: "kuogo_logo.png"
            }, {
                header: "15min Free",
                usedStatus: true,
                description: "国购停车场限定",
                meta: "2015-12-31 12:00AM",
                images: "kuogo_logo.png"
            }, {
                header: "45min Free",
                usedStatus: true,
                description: "国购停车场限定",
                meta: "2015-12-31 12:00AM",
                images: "kuogo_logo.png"
            }, {
                header: "2hr Free",
                usedStatus: true,
                description: "国购停车场限定",
                meta: "2015-12-31 12:00AM",
                images: "kuogo_logo.png"
            }]
        });

        // param [overTime] true: 超時停車  
        router.get('/parkingPayment', function*(next) {
            this.body = [{
                carlicense: "京A BC123",
                entranceTimeStamp: "2015/8/21 15:20:00",
                parkingTime: "1小时12分钟",
                overTime: true,
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

        router.get('/paychoice/carnumbers', function*(next) {
            this.body = [{
                carnumbers: "2"
            }]
        });

        router.get('/paychoice/license', function*(next) {
            this.body = [{
                carlicense: "京A BC123"
            }, {
                carlicense: "京B BC123"
            }]
        });

        router.get('/car/carlicense', function*(next) {
            this.body = [{
                dataID: "id1",
                CarLicenseId: "京A BC123"
            }, {
                 dataID: "id2",
                CarLicenseId: "京B BC123"
            }]
        });
    });
}
