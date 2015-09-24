"use strict"
var WechatAPI = require('co-wechat-api'),
    request = require('request'),
    debug = require('debug')('eskygo:intelliparking:userController'),
    Promise = require('bluebird');

var Stream = require('stream');
var inherits = require('util').inherits;
var Service = require('@eskygo/koala-puree').Spices.Service;
var coread = require('co-read');
var oauth2 = require('passport-oauth2');
var Oauth2Strategy = oauth2.Strategy;
var AuthorizationError = oauth2.AuthorizationError;
var JWT = require('@eskygo/koala-puree').Spices.JWT;
var crypter = require('@eskygo/koala-puree').Spices.Crypt;
var url = require('url');
var request = require('request');
var formatter = require('../../lib/formatter.js');

exports = module.exports = function(app) {
    var ipsService = app.services('intelli-parking-service');

    var m = app.models;
    var token;

    app.group('/session', function(r) {
        function* logout() {
            this.req.logout();
            return this.redirect('/users/signin');
        }

        r.delete('', logout);
        r.get('/logout', logout);
    });

    app.group('/users', function(router) {
        router.get('/signin', function*(next) {
            yield this.render('users/signin.dust', {
                token: this.query['t']
            });
        });
        router.post('/signin', function*(next) {
            var self = this,
                body = yield this.req.body(),
                token = body.t;
            if (!body.mobile || !body.otp) {
                return yield self.render('/users/signin.dust', {
                    error: "请填写信息"
                });
            }

            yield app.passport.authenticate("eskygo", body, function*(err, user, info) {
                debug('authenticated in login');
                //TODO add failed login pages
                if (err) {
                    debug('error' + err);
                    return yield self.render('users/signin.dust', {
                        error: "登入不成功，请重试"
                    });
                }
                if (!user) {
                    debug('user not found');
                    return yield self.render('users/signin.dust', {
                        error: "用户不存在"
                    });
                }
                yield(new Promise(function(resolve, reject) {
                    debug('logging in user now')
                    self.req.login(user, function(err) {
                        console.log("================ fuck token", token)
                        if (token) {
                            debug('token exists')
                            console.log("==================== fuck xxx")
                            try {
                                JWT.verify(token).then(function(obj) {
                                    console.log(obj)
                                    if (obj.origUrl) {
                                        debug('redirecting to ' + obj.origUrl);
                                        self.redirect(obj.origUrl);
                                    }
                                    resolve();
                                }).catch(function(error) {
                                    console.log(error);
                                })
                            } catch (e) {
                                console.log(e);
                            }
                            return;
                        } else {
                            self.redirect('/users/car');
                            resolve();
                        }
                        debug('no token');
                    });
                }));
            });
        });
        router.get('/car', function*(next) {
            var header = {
                "Authorization": [this.req.user.tokenType, ' ', this.req.user.token].join(''),
                "Content-Type": "application/json"
            };
            switch (this.accepts('json', 'html')) {
                case 'json':
                    var cars = yield ipsService.get('/v1/users/self/cars', {}, header);
                    cars = JSON.parse(cars.body);
                    var carData = cars.cars;
                    this.body = carData;
                    break;
                case 'html':
                default:
                    yield this.render('users/car.dust');
                    break;
            }
        });
        router.get('/help', function*(next) {
            yield this.render('users/help.dust')
        });
    });

    //app.group('/users',app.ensureLoggedIn(), function(router) {
    app.group('/users', function(router) {
        
        router.post('/car', function*(next) { // Add new car
            var dustfile = '/users/car.dust',
                header = {
                    "Authorization": [this.req.user.tokenType, ' ', this.req.user.token].join(''),
                    "Content-Type": "application/json"
                };

            try {
                var params = yield this.req.body();
                if (!params.area || !params.abc) {
                    return yield this.render(dustfile);
                }
                var cars = yield ipsService.post('/v1/users/self/cars', {
                    registeredArea: params.area + params.abc,
                    serial: params.car_number
                }, header);
                cars = JSON.parse(cars.body);
                this.body = {
                    cars
                };
            } catch (e) {
                debug("Failed to add new car", e, e.stack);
                return this.status = 500;
            }
        });
        router.post('/car/delete', function*(next) {
            var dustfile = '/users/car.dust',
                header = {
                    "Authorization": [this.req.user.tokenType, ' ', this.req.user.token].join(''),
                    "Content-Type": "application/json"
                };

            try {
                var params = yield this.req.body();
                var delete_car = yield ipsService.delete('/v1/users/self/cars/' + params.id, {}, header);
                delete_car = JSON.parse(delete_car.body);
                this.body = {
                    delete_car
                };
            } catch (e) {
                debug("Failed to delete the car", e, e.stack);
                return this.status = 500;
            }
        });
        router.get('/carAuth', function*(next) {
            yield this.render('users/carAuth.dust')
        });
        router.get('/afterCarAuth', function*(next) {
            yield this.render('users/afterCarAuth.dust')
        });
        router.get('/coupon', function*(next) {
            yield this.render('users/coupon.dust')
        });
        router.get('/couponForPay', function*(next) {
            yield this.render('users/couponForPay.dust')
        });
        router.get('/pay', function*(next) {
            yield this.render('users/pay.dust')
        });
        router.get('/paychoice', function*(next) { /* checked */
            yield this.render('users/paychoice.dust')
        });
        router.get('/record', function*(next) {
            yield this.render('users/record.dust');
        });
        router.get('/record/list', function*(next) {
            var header = {
                "Authorization": [this.req.user.tokenType, ' ', this.req.user.token].join(''),
                "Content-Type": "application/json"
            };

            var record = yield ipsService.get('v1/users/self/equip/parking/history', {}, header);
            record = JSON.parse(record.body);
            /* temporary fake */
            record.history = [{
                    "@type": "d",
                    "@class": "IpsParkingRecord",
                    "plate_no": "test-0001",
                    "amount": 0,
                    "discount": 0,
                    "charge": 0,
                    "payment_type": 1,
                    "arrival": 1442802840792,
                    "coupon_instance": "#42:0",
                    "updated_at": 1442802840793,
                    "created_at": 1442802840793,
                    "@rid": "#37:4",
                    "departure": 1443031892,
                    "parkingLot": {
                        "name": "陆家嘴国购停车场",
                        "active": true,
                        "capacity": 1,
                        "description": null,
                        "eskygo_merchant_shop": "#26:0",
                        "lat": 39.92889,
                        "lng": 116.38833,
                        "updated_at": 1442793600000,
                        "created_at": 1442793600000,
                        "@type": "d",
                        "@class": "IpsParkingLot",
                        "@rid": "#52:0",
                        "settings": null,
                        "rid": "#52:0",
                        "_id": "#52:0",
                        "id": "52:0"
                    }
                }, {
                    "@type": "d",
                    "@class": "IpsParkingRecord",
                    "plate_no": "test-0001",
                    "amount": 0,
                    "discount": 0,
                    "charge": 0,
                    "payment_type": 1,
                    "arrival": 1442802837274,
                    "coupon_instance": null,
                    "updated_at": 1442802837276,
                    "created_at": 1442802837276,
                    "@rid": "#37:3",
                    "departure": 1442804500948,
                    "parkingLot": {
                        "name": "陆家嘴国购停车场",
                        "active": true,
                        "capacity": 1,
                        "description": null,
                        "eskygo_merchant_shop": "#26:0",
                        "lat": 39.92889,
                        "lng": 116.38833,
                        "updated_at": 1442793600000,
                        "created_at": 1442793600000,
                        "@type": "d",
                        "@class": "IpsParkingLot",
                        "@rid": "#52:0",
                        "settings": null,
                        "rid": "#52:0",
                        "_id": "#52:0",
                        "id": "52:0"
                    }
                }]
                //var carData = record.cars;
            this.body = record;
        });
        router.post('/record/detail', function*(next) {
            var params = yield this.req.body();
            yield this.render('users/recordDetail.dust', {
                hide_data: params.detail_data
            })
        });
        router.get('/index', function*(next) {
            yield this.render('users/index.html')
        });
    })
}