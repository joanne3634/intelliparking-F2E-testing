"use strict"
var KoalaPuree = require('@eskygo/koala-puree');
var fs = require('fs');

class Intelliparking extends KoalaPuree {
    constructor() {
        super(module);
        var self = this;
        self._app.use(function* (next){
	    	yield* next;
	      // if ( this.res.push ) {
	      //   var stream = this.res.push('https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.2/jquery.min.js', {host: 'cdnjs.cloudflare.com'});
	      //   stream.end();
	      // }
	    })
    }
	loanJob(path, data, next_run) {
		var lease = {
			job: path,
			data: JSON.stringify(data)
		}
		if (next_run) {
			lease.next_run = next_run;
		}
		return this.models
			.IPWorkerLease
			.create(lease)
	}
    bootstrap() {
			this.use(require("./lib/eskygoStrategy"))
		    this.use(function(){
		      return {
		        setup: function*(next) {
		           yield* next
		           var self = this;
		           console.log("start listening");
		           var cdn = self._config.cdn || "/static/";
		           var staticVersion = fs.existsSync(".staticversion") ? fs.readFileSync(".staticversion") : 0;
		           var dust = self._dust._dust;
		           self._config.staticVersion = staticVersion;
		           require('./lib/dust_helpers.js')(dust, self._config);
		        }
		      }
		    })
	  }
}

exports = module.exports = Intelliparking;

