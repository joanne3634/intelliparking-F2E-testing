"use strict"

var debug = require('debug')('eskygo:intelliparking:wechat-auth');

exports = module.exports = function(app) {
    return function(req, openid, unionid, profile, token, done) {
        var self = this;
        const openidProvider = 'park:wechat',unionidProvider = 'wechat';
        debug("replied with arguments", arguments);
        // logic:
        // first retrieve openid, if openid is not found
        // then retrieve with unionid(if exist)
        // unionid shall be used for merger later, for now, it shall only be used for recording and retrieval
        // 
        var promises = [
            app.services('intelli-parking-service').get("/v1/users/alias", {provider: openidProvider, alias: openid, type: 'openid'},{}),
            unionid ? app.services('intelli-parking-service').get("/v1/users/alias", {provider: unionidProvider, alias: unionid, type: 'unionid'},{}) : true
        ];
        var provider, alias;
        Promise.all(promises)
            .then(function(res){
                debug('retrieving the user');
                var openidRes = res[0];
                var unionidRes = res[1];
                var promises = [];
                if ( 404 === openidRes.status ) {
                    debug('openid not found');
                    promises.push('createOpenId');
                } else {
                    debug('openid found',openidRes.body);
                    promises.push(JSON.parse(openidRes.body));
                }
                if ( unionidRes === true ) {
                    debug('unionid undefined');
                    promises.push(true);
                } else if ( 404 ===  unionidRes.status ) {
                    debug('unionid not found');
                    promises.push('createUnionId');
                } else {
                    debug('unionid found');
                    promises.push(JSON.parse(unionidRes.body));
                }
                return Promise.resolve(promises);
            }).then(function(res){
                // the logic shall be, if both are create, create both together, else, if one exist, add into the records
                // if both exist, check if they are the same, if not, use the openid matched user as the record
                var openIdRes = res[0];
                var unionIdRes = res[1];
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
                    var userId = req.user.id;
                    var aliases = [app.services('intelli-parking-service').post('/v1/users/self/alias', {
                        type: "openid",
                        alias: openid,
                        provider: openidProvider
                    })];

                    provider = openidProvider;
                    alias = openid;

                    if ( unionid ) {
                        debug("OpenId and UnionId both doesnt exist and unionid exist");
                        aliases.push(app.services('intelli-parking-service').post('/v1/users/self/alias', {provider: unionidProvider, type: "unionid", alias: unionid}));
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
                    var userId = unionIdRes.id;
                    provider = unionidProvider;
                    alias = unionid;
                    return app.services('intelli-parking-service').post('/v1/users/self/alias', {
                        type: "openid",
                        alias: openid,
                        provider: openidProvider
                    })
                }
                if ( openIdRes.id && 'createUnionId' === unionIdRes ) {
                    debug("OpenId already exist, but requiring to create UnionId");
                    var userId = openIdRes.id;
                    provider = unionidProvider;
                    alias = unionid;
                    return app.services('intelli-parking-service').post('/v1/users/self/alias', {
                        type: "unionid",
                        alias: unionid,
                        provider: unionidProvider
                    })

                }
            }).then(function(res){
                var body;
                debug("User retrieved");
                if ( res.status === 404 ) {
                    debug("User not found");
                    // user was not created correctly, or alias is missing
                    return Promise.reject("alias is missing, clearly system data migration errors");
                }
                if ( res.body ) {
                    debug("User found", res);
                    if ( res.status !== 200 ) {
                        return Promise.reject(res);
                    }
                    body = JSON.parse(res.body);
                }
                if ( res.id ) {
                    body = res;
                }

                if ( !body ) {
                    debug("User is undefined???");
                    // body is undefined??
                    return Promise.reject("body is undefined??");
                }

                return Promise.all([
                    Promise.resolve(body),
                    app.services('intelli-parking-service').put(`/users/${body.id}/providers/${provider}`, profile)
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