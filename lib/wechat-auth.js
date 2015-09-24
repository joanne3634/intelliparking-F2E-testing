"use strict"

var debug = require('debug')('eskygo:intelliparking:wechat-auth');

exports = module.exports = function(app) {
    return function(req, openid, unionid, profile, token, done) {
        var self = this , tokenObj = null;
        const openidProvider = 'park:wechat',unionidProvider = 'wechat';
        debug("replied with arguments", arguments);
        // logic:
        // first retrieve openid, if openid is not found
        // then retrieve with unionid(if exist)
        // unionid shall be used for merger later, for now, it shall only be used for recording and retrieval
        //
        var promises = [
            app.services('intelli-parking-service').post("/v1/users/signin/alias", {provider: openidProvider, alias: openid, type: 'openid'},{}),
            unionid ? app.services('intelli-parking-service').post("/v1/users/signin/alias", {provider: unionidProvider, alias: unionid, type: 'unionid'},{}) : true
        ];
        var provider, alias;
        Promise.all(promises)
            .then(function(res){
                debug('retrieving the user');
                var openIdRes = res[0];
                var unionIdRes = res[1];

                var promises = [];
                if ( 404 === openIdRes.status ) {
                    debug('openid not found');
                    promises.push('createOpenId');
                } else {
                    debug('openid found',openIdRes.body);
                    promises.push(JSON.parse(openIdRes.body));
                }
                if ( unionIdRes === true ) {
                    debug('unionid undefined');
                    promises.push(true);
                } else if ( 404 ===  unionIdRes.status ) {
                    debug('unionid not found');
                    promises.push('createUnionId');
                } else {
                    debug('unionid found');
                    promises.push(JSON.parse(unionIdRes.body));
                }
                return Promise.resolve(promises);
            }).then(function(res){
                // the logic shall be, if both are create, create both together, else, if one exist, add into the records
                // if both exist, check if they are the same, if not, use the openid matched user as the record
                var openIdRes = res[0];
                var unionIdRes = res[1];

                if(unionIdRes.id) {
                    tokenObj = unionIdRes;
                } else if(openIdRes.id) {
                    tokenObj = openIdRes;
                } else {
                    tokenObj = req.user;
                }

                if ( openIdRes.id && unionIdRes.id ) {
                    provider = unionidProvider;
                    alias = unionid;
                    debug("Both OpenID and UnionID exist, use unionid");
                    return Promise.resolve(unionIdRes);
                }
                if ( openIdRes.id && ( unionIdRes === true || unionIdRes.id ) ) {
                    debug("OpenId exists, and unionid is not returned from weixin");
                    provider = openidProvider;
                    alias = openid;
                    debug('using openid');
                    // both exists, return openId version
                    return Promise.resolve(openIdRes);
                }
                if ( 'createOpenId' === openIdRes && ('createUnionId' === unionIdRes || true === unionIdRes)) {
                    if(!req.isAuthenticated()) {
                    	debug("reject noUser");
                        return Promise.reject("noUser");
                    }

                    debug("OpenId and UnionId both doesnt exist");
                    provider = openidProvider;
                    alias = openid;

                    var aliases = [app.services('intelli-parking-service').post('/v1/users/self/alias', {
                        type: "openid",
                        alias: openid,
                        provider: openidProvider
                    }, {"Authorization": [tokenObj.tokenType, ' ', tokenObj.token].join(''), "Content-Type": "application/json"})];

                    if ( unionid ) {
                        debug("OpenId and UnionId both doesnt exist and unionid exist");
                        aliases.push(app.services('intelli-parking-service').post('/v1/users/self/alias', {provider: unionidProvider, type: "unionid", alias: unionid}, {"Authorization": [tokenObj.tokenType, ' ', tokenObj.token].join(''), "Content-Type": "application/json"}));
                        provider = unionidProvider;
                        alias = unionid;
                    }

                    return Promise.all(aliases).then(function(res) {
                        var openIdRes = res[0];
                        var unionIdRes = res[1];
                        if(openIdRes.status == 200 && (!unionIdRes || unionIdRes.status == 200)) {
                            return Promise.resolve(req.user);
                        }
                        return Promise.reject(new Error("create openid or unionid alias error"));
                    });
                }
                if ( 'createOpenId' === openIdRes && unionIdRes.id ) {
                    // openid doesnt exist, but, unionid exists
                    debug("UnionId already exist, but requiring to create OpenId");

                    provider = unionidProvider;
                    alias = unionid;

                    return app.services('intelli-parking-service').post('/v1/users/self/alias', {
                        type: "openid",
                        alias: openid,
                        provider: openidProvider
                    }, {"Authorization": [tokenObj.tokenType, ' ', tokenObj.token].join(''), "Content-Type": "application/json"})
                    .then(function(res) {
                        if(res.status !== 200) {
                            return Promise.reject(new Error("create openid alias error"));
                        } else {
                            return Promise.resolve(unionIdRes);
                        }
                    })
                }
                if ( openIdRes.id && 'createUnionId' === unionIdRes ) {
                    debug("OpenId already exist, but requiring to create UnionId");

                    provider = unionidProvider;
                    alias = unionid;

                    return app.services('intelli-parking-service').post('/v1/users/self/alias', {
                        type: "unionid",
                        alias: unionid,
                        provider: unionidProvider
                    }, {"Authorization": [tokenObj.tokenType, ' ', tokenObj.token].join(''), "Content-Type": "application/json"})
                    .then(function(res) {
                        if(res.status !== 200) {
                            return Promise.reject(new Error("create unionid alias error"));
                        } else {
                            return Promise.resolve(openIdRes);
                        }
                    });

                }
            }).then(function(res){
                return Promise.all([
                    Promise.resolve(res),
                    app.services('intelli-parking-service').put(`/v1/users/self/providers/${provider}`, profile, {"Authorization": [tokenObj.tokenType, ' ', tokenObj.token].join(''), "Content-Type": "application/json"})
                ]);
            }).then(function(res){
                var body = res[0];
                if ( res[1].status !== 200 ) {
                    // consider if this is really necessary to be part of this or a fireandforget
                    return Promise.reject("Failed to update provider");
                }
                body.provider = provider;
                body.alias = alias;

                return done(null, body, null);
            }).catch(function(err){
                if(err === "noUser") {
                    return done(null, null, null);
                } else {
                    console.log(err.stack);
                    done(new Error(err));
                }
            });
    };
};