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

    // app.group('/users',
    //     app.ensureLoggedIn,
    //     app.ensureRole(
    //         ['13dian'],
    //         function*success(){
    //         },
    //         function*failed(){
    //             this.redirect("/users/waitList")
    //         }
    //     ),
    //     function(router) {
    //         router.get('/rebates', function*(next){
    //             var eskygoUser = this.req.user,rebateable,isNotRebate;
    //             var dian13User = yield m.Dian13User.findOne({eskygo_user: eskygoUser.id}).exec();

    //             try {
    //                 debug("retrieved dian13User", dian13User);
    //                 rebateable = dian13User.get('rebateable_amt');
    //                 debug("retrieved rebatable", rebateable);
    //                 isNotRebate = rebateable < 10000;
    //                 rebateable = {
    //                     whole: Math.floor(rebateable/100),
    //                     decimal: rebateable%100
    //                 }
    //             } catch(e) {
    //                 this.body = e+e.stack;
    //                 return this.status = 500;
    //             }
    //             switch(this.accepts('json', 'html') ) {
    //                 case 'json':
    //                     var rebates = yield m.Dian13Rebate.find({eskygo_user:eskygoUser.id}).sort({created_at:'desc'}).exec()
    //                             .map(function(r){
    //                                 r = r.toJSON({virtuals:true});
    //                                 return r;
    //                             });

    //                     this.body = rebates;
    //                     break;
    //                 case 'html':
    //                 default:
    //                     yield this.render('users/rebates.dust', {
    //                         eskygoUser: eskygoUser,
    //                         rebateable: rebateable,
    //                         isNotRebate: isNotRebate
    //                     });
    //                     break;
    //             }
    //         });

    //         router.put('/:id', function*(next) {
    //             var params = yield this.req.body();
    //             delete params._csrf;
    //             delete params._method;
    //             var user = yield userServ.put(`/users/${this.params.id}`, params);
    //             if(user.status === 200) {
    //                 this.body = "";
    //                 return this.status == 200;
    //             }
    //             return this.status = 500;
    //         });

    //         router.get('/info', function*(next){
    //             var eSkyGoUser = this.req.user;
    //             var dian13User = yield m.Dian13User.findOne({ eskygo_user:'#'+ eSkyGoUser.id }).exec();

    //             if(!dian13User) {
    //                 debug("no associated tool, redirect to /users/signup");
    //                 this.redirect('/users/signup');
    //             } else {
    //                 dian13User.bankCard = [];
    //                 var paymentTools = yield dian13User.associatedPaymentToolEdges().map(function(edge){
    //                     var ptId = edge.in.toString().substr(1);
    //                     console.log(ptId);
    //                     return userServ.get(`/paymentTools/${ptId}`).then(function(pt){
    //                         if ( pt.status !== 200 ) {
    //                             return Promise.reject("payment Tool not found");
    //                         }
    //                         pt = JSON.parse(pt.body);
    //                         dian13User.bankCard.push(pt.masked_card_number);
    //                         return pt;
    //                     });
    //                 });

    //                 var areas = yield userServ.get('/area?area_level=1');
    //                 if(areas.status === 200) areas = JSON.parse(areas.body);
    //                 else areas = [];

    //                 var area = yield userServ.get(`/area?area_code=${eSkyGoUser.signup_area_code}`);
    //                 if(area.status === 200) area = JSON.parse(area.body);
    //                 else area = [];

    //                 if(eSkyGoUser.signupInArea.length > 0) {
    //                     eSkyGoUser.signupInArea = eSkyGoUser.signupInArea[0];
    //                 } else {
    //                     eSkyGoUser.signupInArea = null;
    //                 }

    //                 try {
    //                     if(eSkyGoUser.provider && eSkyGoUser.provider.data && typeof eSkyGoUser.provider.data === "string") {
    //                         eSkyGoUser.provider.data = JSON.parse(eSkyGoUser.provider.data);
    //                     }
    //                 } catch(e) {
    //                     console.log(e.stack);
    //                 }

    //                 eSkyGoUser.areaName = eSkyGoUser.signupInArea?eSkyGoUser.signupInArea.area_name:'您还未选择所属区域';
    //                 if(this.query['flashmessage']){
    //                     console.log('flashmessage>>>>>>>>>>',flashmessage);
    //                     var flashmessage = this.query['flashmessage'];
    //                 }
    //                 yield this.render('users/info.dust', {
    //                     dian13user: dian13User,
    //                     euser: eSkyGoUser,
    //                     areas: areas,
    //                     flashmessage: flashmessage
    //                 });
    //             }
    //         });

    //         router.post('/rebates', function*(next){
    //             debug("creating rebate");
    //             var eSkyGoUser = this.req.user;
    //             var body = yield this.req.body();
    //             if ( !body.step ) {
    //                 return this.status = 400;
    //             }
    //             var rebateAmt = body.step * 10000;
    //             try {
    //                 var dian13User = yield m.Dian13User.findOne({ eskygo_user:'#'+ eSkyGoUser.id}).exec();

    //                 if ( !dian13User ) {
    //                     debug("dian13user is not found");
    //                     return this.status = 404;
    //                 }
    //                 var availRebateAmt = dian13User.get('rebateable_amt'), rebateable;
    //                 if ( availRebateAmt < 10000 || availRebateAmt < rebateAmt) {
    //                     rebateable = {
    //                         whole: Math.floor(availRebateAmt/100),
    //                         decimal: availRebateAmt%100
    //                     };
    //                     this.body = {
    //                         payload: {
    //                             rebateable_amt: availRebateAmt,
    //                             rebateable: rebateable
    //                         },
    //                         error: "余额过低"
    //                     };
    //                     return this.status = 400;
    //                 }
    //                 var oriento = app._orm._db;
    //                 var query = oriento.let('dian13rebate', function(s) {
    //                     return s.create('vertex', 'Dian13Rebate').set({eskygo_user: new app._orm.Oriento.RecordID('#'+eSkyGoUser.id), amount: rebateAmt, status:'pending',updated_at: Date.now(), created_at: Date.now()});
    //                 });
    //                 query = query.let('dian13user', function(s) {
    //                     return s.update(dian13User.id).increment('rebateable_amt', -rebateAmt).return('after')
    //                 });
    //                 var result = yield query.commit().return('$dian13user').one();

    //                 rebateable = {
    //                     whole: Math.floor(result.rebateable_amt/100),
    //                     decimal: result.rebateable_amt%100
    //                 };
    //                 this.body = {
    //                     payload: {
    //                         rebateable_amt: result.rebateable_amt,
    //                         rebateable: rebateable
    //                     }
    //                 };
    //             } catch(e) {
    //                 console.log(e);
    //                 this.body = e+e.stack;
    //                 return this.status = 500;
    //             }
    //         });
    //         router.get('/transactions', function*(next){
    //             var eSkyGoUser = this.req.user;
    //             var dian13User = yield m.Dian13User.findByESkygoUserId(eSkyGoUser.id);

    //             this.body = yield m.Dian13SpendsAt
    //                 .getByDian13UserId(dian13User.id)
    //                 .sort({created_at:'desc'})
    //                 .exec()
    //                 .map(function(spends){
    //                     return spends.getDian13MerchantShop()
    //                         .exec()
    //                         .then(function(shop){
    //                             return merchantServ.get(`/shops/${shop.eskygo_merchant_shop_id}`);
    //                         })
    //                         .then(function(res){
    //                             if ( 200 !== res.status ) {
    //                                 return Promise.reject(new Error("unable to retrieve shop"));
    //                             }
    //                             var body = JSON.parse(res.body);
    //                             spends = spends.toJSON({virtuals:true});
    //                             spends.shop_name = body.name;
    //                             return Promise.resolve(spends);
    //                         })
    //                 })
    //         });

    //         router.get('/transactions/history', function*(next){
    //             var eSkyGoUser = this.req.user;
    //             var dian13User = yield m.Dian13User.findByESkygoUserId(eSkyGoUser.id);

    //             this.body = yield m.Dian13SpendsAt
    //                 .getByDian13UserId(dian13User.id)
    //                 .sort({created_at:'desc'})
    //                 .group('status')
    //                 .exec()
    //         })

    //         router.get('/result',function*(next){
    //             yield this.render('users/result.dust');
    //         });
    // });

    // app.group('/users', app.ensureLoggedIn, function(router) {
    //     router.get('/waitList', function*() {
    //         yield this.render('users/waitList.dust');
    //     });
    // });

    app.group('/users', function(router) {
        router.get('/v1/signup', function*(next){
            yield this.render('users/signup.dust', {token:this.query['t']});
        });

        router.post('/v1/signup', function*(next){
            var self = this, dustFile = 'users/signup.dust', dian13User , eSkyGoUser;
            try {
                var params = yield this.req.body();
                if(params.channel && params.channel === "welcome") {
                    dustFile = 'home/welcome.dust';
                }
                delete params.channel;
                if ( !params.name || !params.bankCard || !params.username || !params.password) {
                    return yield this.render(dustFile, {
                        error: "请填写信息"
                    });
                }
                if ( params.name === "" || params.bankCard === ""  || params.username === "" || params.password === "" ) {
                    return yield this.render(dustFile, {
                        error: "请填写信息"
                    });
                }

                var alias = {type: "username", alias: params.username, provider: "eskygo", password: params.password};

                var checkRes = yield userServ.post('/users/check', alias, {});
                checkRes = JSON.parse(checkRes.body);

                if(checkRes.res && checkRes.userId) {
                    dian13User = yield m.Dian13User.findOne({"eskygo_user":"#"+checkRes.userId}).exec();
                    if(dian13User) {
                        return yield this.render(dustFile, {
                            error: "用户已存在"
                        });
                    }
                    eSkyGoUser = {id: checkRes.userId};
                } else if(!checkRes.res && checkRes.userId) {
                    // user exist, but it is wrong password
                    return this.status = 409;
                } else {
                    eSkyGoUser = yield userServ.post('/users', {
                        name: params.name,
                        mobile: params.username,
                        password: params.password,
                        area: params.area,
                        alias: {type: "username", alias: params.username, provider: "eskygo"},
                        provider: {type: "eskygo", data:''}
                    }, {});
                    eSkyGoUser = JSON.parse(eSkyGoUser.body);
                }

                try {
                    dian13User = new m.Dian13User({
                        eskygo_user: '#'+eSkyGoUser.id
                    });
                    dian13User = yield dian13User.save();
                } catch(e) {
                    if ( 'com.orientechnologies.orient.core.storage.ORecordDuplicatedException' !== e.type ) {
                        throw e;
                    } else {
                        dian13User = m.Dian13User.findOne({
                            eskygo_user: '#'+eSkyGoUser.id
                        }).exec();
                    }
                }

                debug("eSkyGoUser", eSkyGoUser);
                debug("dian13user", dian13User);
                var paymentTool = yield userServ.post(`/users/${eSkyGoUser.id}/paymentTools/bankcard`,{identity:params.bankCard});
                paymentTool = JSON.parse(paymentTool.body);

                // associating paymenttool
                var state = yield dian13User.associatePaymentTool(paymentTool.id);

                var token = params.t;
                eSkyGoUser.provider = "eskygo";
                eSkyGoUser.alias = params.username;

                yield (new Promise(function(resolve, reject){
                    debug('signup success logging in user now')
                    self.req.login(eSkyGoUser, function(err){
                        if ( token ) {
                            debug('token exists');
                            JWT.verify(token).then(function(obj){
                                if ( obj.origUrl) {
                                    debug('redirecting to '+ obj.origUrl);
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
            } catch(e) {
                debug("Failed to signup user", e, e.stack);
                return this.status=500;
            }
        });

        router.get('/signin', function*(next){
            yield this.render('users/car.html', {token:this.query['t']});
        });

        router.post('/signin', function*(next){
            var self = this;
            var body = yield this.req.body();
            var token = body.t;

            debug("preparing authentication");

            if ( !body.username ||  !body.password) {
                return yield this.render('users/signin.dust', {
                    error: "请填写信息"
                });
            }
            // this should handle special cases later on, for example, loggedin to an account with no cards

            yield app.passport.authenticate("eskygo", body, function*(err, user, info){
                debug('authenticated in login');
                //TODO add failed login pages
                if ( err ) { debug('error'+err);
                    return yield self.render('users/signin.dust', {
                        error: "登入不成功，请重试"
                    });
                }
                if ( !user ) {
                    debug('user not found');
                    return yield self.render('users/signin.dust', {
                        error: "用户不存在"
                    });
                }
                yield (new Promise(function(resolve, reject){
                    debug('logging in user now')
                    self.req.login(user, function(err){
                        if ( token ) {
                            debug('token exists')
                            JWT.verify(token).then(function(obj){
                                if ( obj.origUrl) {
                                    debug('redirecting to '+obj.origUrl);
                                    self.redirect(obj.origUrl);
                                }
                                resolve();
                            }).catch(reject)
                            return;
                        } else {
                            self.redirect('/users/info');
                            resolve();
                        }
                        debug('no token');
                    });
                }));
            });
        });
    });

    app.get('/area', function*(next){
        try {
            var areas = yield userServ.get(this.req.url);

            if(areas.status === 200) {
                areas =  JSON.parse(areas.body);
            } else {
                return this.status = areas.status;
            }

            switch(this.accepts('json', 'html') ) {
                case 'json':
                    this.body = areas;
                    this.status = 200;
                    break;
                case 'html':
                default:
                    yield this.render('users/_area-list.dust', {
                        areas: areas,
                        content: true
                    });
                    break;
            }
        } catch(e) {
            debug(e.stack);
            return this.status = 500;
        }
    });

}
