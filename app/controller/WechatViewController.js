"use strict"
var WechatAPI = require('co-wechat-api'),
    request = require('request'),
    Promise = require('bluebird');

exports = module.exports = function(app) {
    var m = app.models;
    app.group('/wechat-view', function(router) {
        router.get('/car', function*(next) {
            yield this.render('wechat-view/car.html', {
                token: this.query['t']
            });
        });

        router.get('/index', function*(next) {
            yield this.render('wechat-view/index.html', {
                token: this.query['t']
            });
        });


        router.get('/ParkingPayment', function*(next) {
            yield this.render('wechat-view/ParkingPayment.html', {
                token: this.query['t']
            });
        });

        router.get('/ParkingPaymentOverTime', function*(next) {
            yield this.render('wechat-view/ParkingPaymentOverTime.html', {
                token: this.query['t']
            });
        });

        router.get('/parkingRecord', function*(next) {
            yield this.render('wechat-view/parkingRecord.html', {
                token: this.query['t']
            });
        });

        router.get('/paychoice', function*(next) {
            yield this.render('wechat-view/paychoice.html', {
                token: this.query['t']
            });
        });
        router.get('/UseCouponForParkingPayment', function*(next) {
            yield this.render('wechat-view/UseCouponForParkingPayment.html', {
                token: this.query['t']
            });
        });




    });

}
