var EskygoStrategy = require("./passport.js")
var debug = require("debug")("eskygo-user-service-plugin")
module.exports = exports = {
    setup:function*(next) {
        yield *next;
        var self = this;
        var passport = this.passport;
        var strategy = new EskygoStrategy(function(alias, provider, otp, done) {
            console.log("strategy verification");
            self.services('intelli-parking-service').post('/v1/users/signup', {mobile:alias, otp: otp}, {}).then(function(res){
                debug("User check replied", res.status, res.body);
                if(409 === res.status) {
                    self.services('intelli-parking-service').post('/v1/users/signin', {mobile:alias, otp: otp}, {}).then(function(res){
                        if ( 200 !== res.status ) {
                            done(new Error("User is not correctly returned"));
                        }
                        var body = JSON.parse(res.body);
                        done(null, body);
                    })
                } else {
                    if ( 200 !== res.status ) {
                        done(new Error("User is not correctly returned"));
                    }
                    var body = JSON.parse(res.body);
                    done(null, body);
                }
            });
        }, self);
        passport.use(strategy);
        passport.serializeUser(function(user, done){
            debug('serializing user:', user);
            self.JWT.sign({user: user}).then(function(key){
                debug(`generated key ${key}`)
                done(undefined, key);
            }).catch(done);
        });
        passport.deserializeUser(function(key, done){
            debug("DOESNT WORK???", key);
            self.JWT.verify(key).then(function(obj){
                debug("user deserialized", obj);
                if ( obj.user && obj.user.id && obj.user.token ) {
                    obj.user.provider = obj.user.provider || "eskygo";
                    done(null, obj.user);
                } else {
                    debug('session faulty');
                    done(null, false);
                    // this.logout();
                    // this.redirect(404);
                    // done(new Error("session doesnt contain a user"), undefined);
                }
            }).catch(function(err){
                console.log("this is an error !!!!!!!!", err.stack);
                done(null, false);
            });

        })
        self.ensureLoggedIn = function*(next){
            if ( !this.isAuthenticated() ) {
                var origUrl = require('url').resolve('http://'+this.req.headers.host+'/', this.req.url);
                console.log(origUrl);
                var token = yield self.JWT.sign({origUrl:origUrl})
                return this.redirect(self._config.passport.loginUrl+"?t="+token);
            }
            yield next;
        };
    }
}
