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
var formatter = require('../../lib/formatter.js');
var https = require('https');

exports = module.exports = function(app) {
    var ipsService = app.services('intelli-parking-service');

    var m = app.models;

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
                debug('err', err);
                debug('user', user);
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
                if (user.status && user.status == 400) {

                    debug('errmsg', user.message);
                    return yield self.render('users/signin.dust', {
                        error: user.message
                    });
                }
                yield(new Promise(function(resolve, reject) {
                    debug('logging in user now')
                    self.req.login(user, function(err) {
                        if (token) {
                            debug('token exists')
                            JWT.verify(token).then(function(obj) {
                                if (obj.origUrl) {
                                    debug('redirecting to ' + obj.origUrl);
                                    self.redirect(obj.origUrl);
                                }
                                resolve();
                            }).catch(function(error) {
                                console.log(error);
                                reject(error);
                            })
                        } else {
                            // ipsService.post('/v1/coupons/WechatRegistrationGift', {}, {
                            //     "Authorization": [user.tokenType, ' ', user.token].join(''),
                            //     "Content-Type": "application/json"
                            // });
                            self.redirect('/users/car');
                            resolve();
                        }
                        debug('no token');
                    });
                }));
            });
        });

        router.get('/help', function*(next) {
            yield this.render('users/help.dust')
        });
    });

    //app.group('/users',app.ensureLoggedIn(), function(router) {
    app.group('/users', function(router) {
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
        router.get('/carAuth', function*(next) { // 先不做 feature 先設置為false 為提示文字
            yield this.render('users/carAuth.dust', {
                feature: false
            })
        });
        // router.get('/afterCarAuth', function*(next) { // 先不做 
        //     yield this.render('users/afterCarAuth.dust')
        // });
        router.get('/coupon', function*(next) {
            var header = {
                "Authorization": [this.req.user.tokenType, ' ', this.req.user.token].join(''),
                "Content-Type": "application/json"
            };
            switch (this.accepts('json', 'html')) {
                case 'json':
                    var coupons = yield ipsService.get('/v1/users/self/coupons', {}, header);
                    coupons = JSON.parse(coupons.body);
                    this.body = coupons.coupons;
                    break;
                case 'html':
                default:
                    yield this.render('users/coupon.dust');
                    break;
            }
        });
        router.post('/coupon/pay', function*(next) {
            var params = yield this.req.body();
            yield this.render('users/couponForPay.dust', {
                hide_data: params.h
            })
        });
        router.post('/coupon/detail', function*(next) {
            var params = yield this.req.body();
            var header = {
                "Authorization": [this.req.user.tokenType, ' ', this.req.user.token].join(''),
                "Content-Type": "application/json"
            };
            var coupons = yield ipsService.get('/v1/users/self/coupons/' + params.cptid + '/instances/' + params.cpiid, {}, header);
            coupons = JSON.parse(coupons.body);
            // console.log(coupons.status);
            // if (coupons.status === 200) {
            this.body = {
                coupons
            };
            // } else {
            //     return this.status = coupons.status;
            // }


        });
        // router.get('/pay', function*(next) { // for test 
        //     // yield this.render('users/pay.dust');
        //     var params = yield this.req.url;
        //     console.log( params);
        //     // yield this.render('users/pay.dust', {
        //     //     hide_data: params.detail_data,
        //     //     cptid: (!params.cptid ? 0 : params.cptid),
        //     //     cpiid: (!params.cpiid ? 0 : params.cpiid)
        //     // })
        // });
        router.post('/pay', function*(next) {
            var params = yield this.req.body();
            console.log(params);
            yield this.render('users/pay.dust', {
                hide_data: params.detail_data,
                cptid: (!params.cptid ? 0 : params.cptid),
                cpiid: (!params.cpiid ? 0 : params.cpiid)
            })
        });
        router.get('/paychoice', function*(next) {
            switch (this.accepts('json', 'html')) {
                case 'json':
                    var header = {
                        "Authorization": [this.req.user.tokenType, ' ', this.req.user.token].join(''),
                        "Content-Type": "application/json"
                    };
                    var fee = yield ipsService.get('/v1/users/self/equip/parking/fee', {}, header);
                    fee = JSON.parse(fee.body);
                    this.body = fee;
                    break;
                case 'html':
                default:
                    var header = {
                        "Authorization": [this.req.user.tokenType, ' ', this.req.user.token].join(''),
                        "Content-Type": "application/json"
                    };
                    var data = yield ipsService.get('/v1/users/self/equip/parking/fee', {}, header);
                    data = JSON.parse(data.body);
                    console.log(data);

                    if (data.total && data.total == 1) {
                        var detail_data = JSON.stringify(data.IpsParkingRecords[0]);
                        yield this.render('users/pay.dust', {
                            hide_data: detail_data,
                            cptid: 0,
                            cpiid: 0
                        })
                        break;
                    }
                    if (data.status == 404 || data.record == 0) {
                        data.total = 0;
                    }
                    for (var key in data.IpsParkingRecords) {
                        data.IpsParkingRecords[key]['json_data'] = JSON.stringify(data.IpsParkingRecords[key]);
                    }
                    var insert_data = {
                        "carCount": data.total,
                        "carLicenses": data.IpsParkingRecords
                    }
                    yield this.render('users/paychoice.dust', insert_data);
                    break;
            }
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
            this.body = record;
        });
        router.post('/record/detail', function*(next) {
            var params = yield this.req.body();
            yield this.render('users/recordDetail.dust', {
                hide_data: params.detail_data
            })
        });
        router.get('/wallet', function*(next) {
            var header = {
                "Authorization": [this.req.user.tokenType, ' ', this.req.user.token].join(''),
                "Content-Type": "application/json"
            };
            var wallet = yield ipsService.get('v1/users/self/wallet', {}, header);
            this.body = JSON.parse(wallet.body);
        });
        router.post('/wallet/pay', function*(next) {

            var header = {
                "Authorization": [this.req.user.tokenType, ' ', this.req.user.token].join(''),
                "Content-Type": "application/json"
            };

            var params = yield this.req.body();
            if (!params.parking_record) {
                return this.status = 400;
            }

            if (params.order_type == 2) {

                var access_token = yield ipsService.get('v1/users/self/order/access-token', {}, header);
                access_token = JSON.parse(access_token.body);
                if (access_token.status != 200) {
                    debug("Failed to query access_token", access_token.message);
                    return this.status = 500;
                }
                access_token = access_token.token;


                var order_token = yield ipsService.post('v1/users/self/order/order-token', {
                    amount: params.amount,
                    order_type: params.order_type
                }, header);
                order_token = JSON.parse(order_token.body);
                // debug('order_token', order_token);

                if (order_token.status != 200) {
                    debug("Failed to query order_token", order_token.message);
                    return this.status = 500;
                }

                var out_sn = order_token.out_sn;
                order_token = order_token.token;

                var info = yield ipsService.get('v1/users/self', {}, header);
                var mobile = JSON.parse(info.body).mobile;
                // debug(' mobile : ', mobile);

                let options = {
                    host: 'qtsandbox.qfpay.com',
                    port: 443,
                    path: '/wap/v1/checkout/get_openid?app_code=AE83B43FD1B30305C97C4A25D5988A97&token=' + access_token + '&order_token=' + order_token + '&goods_name=停車費繳費&mobile=' + mobile + '&total_amt=' + params.amount + '&out_sn=' + out_sn,
                    method: 'GET'
                }
                // debug('options:!!!!!!!!~~~~~~', options);
                var url = 'https://qtsandbox.qfpay.com/wap/v1/checkout?app_code=AE83B43FD1B30305C97C4A25D5988A97&token=' + access_token + '&order_token=' + order_token + '&goods_name=停車費繳費&mobile=' + mobile + '&total_amt=' + params.amount + '&out_sn=' + out_sn;
                return this.body = {
                    url
                };

                // this.redirect('/users/car'); 
                // document.location = document.location.origin + '/carAuth';
                // app_code    是   app唯一标示 AE83B43FD1B30305C97C4A25D5988A97
                // token   是   访问钱台用的token值    access_token
                // order_token 是   预下单时返回的 order_token order_token
                // out_sn  是   外部订单号，每次传此参数必须保证唯一  
                // total_amt   是   支付总金额，单位分，需要和预下单一致  total_amount
                // mobile  是   消费者手机   user.mobile
                // goods_name  是   商品名称    停車費繳費
                // mchnt_name  是   商户名称    eGoPark    
                // let result = yield new Promise(function(resolve, reject) {
                //     https.request(options, function(res) {
                //         // debug(`[/order/access-token] http status from QFPay for access token: ${res.statusCode}`)
                //         debug('res',res);
                //         var json = ''
                //         res.on('data', function(chunk) {
                //             json += chunk
                //         })
                //         res.on('end', function() {
                //             json = JSON.parse(json)
                //             if (json['respcd'] === '0000') {
                //                 let token = json['data']['token']
                //                 debug(`[/order/access-token] QFPay access token = ${token}`)
                //                 resolve(token)
                //             } else {
                //                 let msg = `error code = ${json['respcd']}, error msg = '${decodeURIComponent(json['resperr'])}'`
                //                 debug(`[/order/access-token] error on retrieving access token: ${msg}`)
                //                 reject(new IpsError(`Third-party API error: ${msg}`, 500, 0x50001011))
                //             }
                //         })
                //     }).end()

                // })
                // debug(result);
            } else {
                var transaction = yield ipsService.post('v1/users/self/payment/parking-record', {
                    parking_record: params.parking_record,
                    order_type: params.order_type,
                    coupon_instance: params.coupon_instance
                }, header);
                transaction = JSON.parse(transaction.body);

                this.body = {
                    transaction
                };
            }
        });

        router.get('/index', function*(next) {
            yield this.render('users/index.html')
        });

        router.post('/otp', function*(next) {
            var params = yield this.req.body();
            var otp = yield ipsService.post('v1/otp', {
                type: params.type,
                target: params.target
            });
            otp = JSON.parse(otp.body);
            console.log(otp);
            return otp.status;
        });
    })
}