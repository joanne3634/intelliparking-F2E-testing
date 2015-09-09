"use strict";
var oauth2 = require('passport-oauth2'),
    debug = require('debug')('eskygo:park:WechatStrategy'),
    url = require('url'),
    JWT = require('@eskygo/koala-puree').Spices.JWT,
    Oauth2Strategy = oauth2.Strategy,
    AuthorizationError = oauth2.AuthorizationError,
    request = require('request');

class WechatStrategy extends Oauth2Strategy {
    constructor(options, verify) {
        super(options, verify);
        this.name = options.name || "eskygo-wechat";
        this.app = options.app;
    }
    authenticate(req, options) {
        if ( req.isAuthenticated() && (req.user.provider.type === "wechat" || req.user.provider.type === "park:wechat")) {
            debug('already authenticated');
            // req.user.provider = "wechat";
            req.user.provider = req.user.provider.type;
            return this.success(req.user);
        }
        debug('user is not authenticated yet');
        options = options || {};
        var self = this;
        // handle if this is a normal code
        var callbackURL = options.callbackURL || this._callbackURL;
        if (callbackURL) {
            var parsed = url.parse(callbackURL);
            if (!parsed.protocol) {
                // The callback URL is relative, resolve a fully qualified URL from the
                // URL of the originating request.
                callbackURL = url.resolve(utils.originalURL(req, {
                    proxy: this._trustProxy
                }), callbackURL);
            }
        }

        if (req.query && (req.query.state && !req.query.code)) {
            return this.error(new AuthorizationError('User didnt authorize'));
        }

        if (req.query && req.query.code && req.query.state) {
            debug('wechat redirected back with', req.query);
            var code = req.query.code;
            var params = this.tokenParams(options);
            params.grant_type = 'authorization_code';
            params.redirect_uri = callbackURL;
            var accessTokenReqUrl = `${self._oauth2._accessTokenUrl}?appid=${self._oauth2._clientId}&secret=${self._oauth2._clientSecret}&code=${code}&grant_type=authorization_code`;
            debug(accessTokenReqUrl);
            JWT.verify(req.query.state).then(function(obj) {
                debug('state verified:', obj);
                function verified(err, user, info) {
                    if ( err ) { return self.error(err); }
                    if ( !user ) {
                        var redirect = obj.redirect || options.defaultRedirect
                        var origUrl = 'http://'+ req.headers.host + '/wechat/action?toUrl=' + redirect;

                        return JWT.sign({origUrl:origUrl}).then(function(token) {
                            return self.redirect(self.app._config.passport.loginUrl+"?t="+token);
                        });
                    }
                    self.success(user, info);
                    if ( obj.redirect ) {
                        return self.redirect(obj.redirect); 
                    }
                }
                request
                    .get(accessTokenReqUrl, function(err, response, body) {
                        if ( err ) {
                            debug('token req failed:', err);
                            return self.error(err);
                        }
                        body = JSON.parse(body);
                        var accessToken = body.access_token;
                        var refreshToken = body.refresh_token;
                        var openid = body.openid;
                        debug("weixin access token body", body);
                        request.get(`https://api.weixin.qq.com/sns/userinfo?access_token=${accessToken}&openid=${openid}`, function(err, res, profile){
                            if ( err ) {
                                debug('user profile req failed:', err);
                                return self.error(err);
                            }
                            var jsprofile = JSON.parse(profile);
                            debug("user profile from weixin", jsprofile);

                            var unionid = jsprofile.unionid;
                            // if ( !profile.unionid ) {
                            //     profile.unionid = profile.openid;
                            // }

                            self._verify(req, openid, unionid, profile, accessToken, verified);
                        })
                    })
            });
        } else {
            var params = this.authorizationParams(options);
            params.response_type = 'code';
            params.redirect_uri = callbackURL;
            debug("callbackURL", callbackURL);
            var scope = options.scope || this._scope;
            if (scope) {
                if (Array.isArray(scope)) {
                    scope = scope.join(this._scopeSeparator);
                }
                params.scope = scope;
            }
            var redirect, query;
            if ( req.query ) {
                query = req.query;
                if ( query && query.toUrl ) {
                    redirect = query.toUrl;
                    delete query.toUrl;
                }
            }

            redirect = redirect || req.url;
            if ( query ) {
                redirect = [redirect, require('querystring').stringify(query)].join("?");
            }

            debug("redirecting it back to", redirect);
            JWT.sign({
                redirect: redirect
            }).then(function(token) {
                params.state = token;
                params['appid'] = self._oauth2._clientId;
                var location = self._oauth2.getAuthorizeUrl(params)+"#wechat_redirect";
                debug("redirecting to: ", location);
                self.redirect(location);
            }).catch(this.error);
        }
    }
}

exports = module.exports = WechatStrategy;
