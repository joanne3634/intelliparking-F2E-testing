"use strict"
var WechatAPI = require('co-wechat-api'),
    request = require('request'),
    debug = require('debug')('eskygo:13dian:userController'),
    Promise = require('bluebird');

// var Stream = require('stream');
// var inherits = require('util').inherits;
// var Service = require('@eskygo/koala-puree').Spices.Service;
// var coread = require('co-read');
// var oauth2 = require('passport-oauth2');
// var Oauth2Strategy = oauth2.Strategy;
// var AuthorizationError = oauth2.AuthorizationError;
// var JWT = require('@eskygo/koala-puree').Spices.JWT;
// var crypter = require('@eskygo/koala-puree').Spices.Crypt;
// var url = require('url');
// var request = require('request');
// var formatter = require('../../lib/formatter.js');

exports = module.exports = function(app) {
    // var userServ = app.services('eskygo-user-service');
    // var merchantServ = app.services('eskygo-merchant-service');

    var m = app.models;


    app.group('/users', function(router) {
        router.get('/index', function*(next) {
            yield this.render('users/index.html')
        });
        router.get('/signin', function*(next) {
            yield this.render('users/signin.dust')
        });
        router.get('/car', function*(next) {
            yield this.render('users/car.dust')
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
        router.get('/help', function*(next) {
            yield this.render('users/help.dust')
        });
        router.get('/pay', function*(next) {
            yield this.render('users/pay.dust')
        });
        router.get('/paychoice', function*(next) {
            yield this.render('users/paychoice.dust')
        });
        router.get('/record', function*(next) {
            yield this.render('users/record.dust')
        });
        router.get('/recordDetail', function*(next) {
            yield this.render('users/recordDetail.dust')
        });
        router.post('/signup', function*(next) {
            var self = this,
                dustFile = 'users/v2/signup.dust',
                dian13User, eSkyGoUser;
            try {
                var params = yield this.req.body();
                if (params.channel && params.channel === "welcome") {
                    dustFile = 'home/welcome.dust';
                }
                delete params.channel;
                if (!params.username || !params.password) {
                    return yield this.render(dustFile, {
                        error: "请填写信息"
                    });
                }
                if (params.username === "" || params.password === "") {
                    return yield this.render(dustFile, {
                        error: "请填写信息"
                    });
                }

                var alias = {
                    type: "username",
                    alias: params.username,
                    provider: "eskygo",
                    password: app._crypter.hash(params.password)
                };

                var checkRes = yield userServ.post('/users/check', alias, {});
                checkRes = JSON.parse(checkRes.body);

                if (checkRes.res && checkRes.userId) {
                    dian13User = yield m.Dian13User.findOne({
                        "eskygo_user": "#" + checkRes.userId
                    }).exec();
                    if (dian13User) {
                        return yield this.render(dustFile, {
                            error: "用户已存在"
                        });
                    }
                    eSkyGoUser = {
                        id: checkRes.userId
                    };
                } else if (!checkRes.res && checkRes.userId) {
                    // user exist, but it is wrong password
                    return this.status = 409;
                } else {
                    eSkyGoUser = yield userServ.post('/users', {
                        name: "",
                        mobile: params.username,
                        password: params.password,
                        area: params.area,
                        alias: {
                            type: "username",
                            alias: params.username,
                            provider: "eskygo"
                        },
                        provider: {
                            type: "eskygo",
                            data: ''
                        }
                    }, {});
                    eSkyGoUser = JSON.parse(eSkyGoUser.body);
                }

                try {
                    dian13User = new m.Dian13User({
                        eskygo_user: '#' + eSkyGoUser.id,
                        last4_number: params.last4_number
                    });
                    dian13User = yield dian13User.save();
                    yield userServ.post(`/users/` + eSkyGoUser.id + `/roles`, {
                        roles: ["13dian"]
                    });
                } catch (e) {
                    if ('com.orientechnologies.orient.core.storage.ORecordDuplicatedException' !== e.type) {
                        throw e;
                    } else {
                        dian13User = m.Dian13User.findOne({
                            eskygo_user: '#' + eSkyGoUser.id
                        }).exec();
                    }
                }

                debug("eSkyGoUser", eSkyGoUser);
                debug("dian13user", dian13User);

                var token = params.t;
                eSkyGoUser.provider = "eskygo";
                eSkyGoUser.alias = params.username;

                yield(new Promise(function(resolve, reject) {
                    debug('signup success logging in user now')
                    self.req.login(eSkyGoUser, function(err) {
                        if (token) {
                            debug('token exists');
                            JWT.verify(token).then(function(obj) {
                                if (obj.origUrl) {
                                    debug('redirecting to ' + obj.origUrl);
                                    self.redirect(obj.origUrl);
                                }
                                resolve();
                            }).catch(reject);
                            return;
                        } else {
                            self.redirect('/users/result');
                            resolve();
                        }
                        debug('no token');
                    });
                }));
            } catch (e) {
                debug("Failed to signup user", e, e.stack);
                return this.status = 500;
            }
        });
    })

}