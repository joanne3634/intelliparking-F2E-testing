"use strict";

class DaemonRunner {
	constructor(daemonClass, options) {
		this.daemonClass = daemonClass;
		this.options = options;
	}
	start() {
		var daemon = new this.daemonClass(this.options);
		this.daemon = daemon;
		var self = this;
		function next(){
			self.daemon.run().then(function(){
				self.daemon.sleep();
				setTimeout(function(){
					next();
				}, self.daemon.lastSleepDuration);
			}).catch(function(err){
				self.daemon.sleep();
				setTimeout(function(){
					next();
				}, self.daemon.lastSleepDuration);
				console.log(err, "in daemon", self.daemon.name, err.stack);
			});
		};
		next();
	}
}

module.exports = DaemonRunner;