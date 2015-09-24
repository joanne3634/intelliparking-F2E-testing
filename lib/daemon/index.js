"use strict";

class Daemon {
	constructor(name, options) {
		this._name = name;
		this.maxSleep = 1000*60*60;	// lets make max sleep time 1hr
		this.lastSleepDuration = 10;
	}
	sleep(time) {
		if (!time) {
			time = this.lastSleepDuration;
		}
		time = this._sleep(time);
		if ( time > this.maxSleep ) {
			time = this.maxSleep;
		}

		this.lastSleepDuration = time;
	}
	_sleep(time) {
		return time * 1.1;
	}
}

module.exports = Daemon;