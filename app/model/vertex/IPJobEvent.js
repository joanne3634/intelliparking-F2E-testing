"use strict";
var crypter = require('@eskygo/koala-puree').Spices.Crypt,
    debug = require('debug')('eskygo:13dian:models:IPJobEvent');

class IPJobEvent {
    constructor(s) {
		s.string('pid',{required: true}),
		s.string('name',{required: true}),
		s.string('machine',{required: true}),
		s.string('event',{required: true}),
		s.string('os',{required: true}),
		s.string('runningAs',{required: true}),
		s.string('env',{required: true}),
		s.string('message',{required: true}),
        s.timestamps();
    }
}


module.exports = IPJobEvent;
