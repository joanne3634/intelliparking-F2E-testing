"use strict"
var Strategy = require('passport-strategy'),
    debug = require('debug')('ips-user-passport-strategy')


class EskygoStrategy extends Strategy {
    constructor(verify, app){
        super();
        this._verify = verify;
        this.name = "eskygo";
        this._app = app;
    }
    authenticate(req, options) {
        var self = this;
        console.log(options)
        this._verify(options.mobile, "eskygo", options.otp, function verified(err, user, info){
            debug("Eskygo Strategy Verified called");
            if ( err ) {
                debug("EskygoStrategy verified error", err);
                return self.error(err);
            }
            debug("Eskygo Strategy Verified called2");
            if ( !user ) {
                debug("EskygoStrategy verified error: user is empty");
                req.session=null;
                return self.pass();
            }
            debug("Eskygo Strategy Verified called3", user);
            user.alias = options.username;
            debug("EskygoStrategy completing:", user);
            self.success(user, info);
        });
    }
}

module.exports = exports = EskygoStrategy;
