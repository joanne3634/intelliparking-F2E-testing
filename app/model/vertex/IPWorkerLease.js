"use strict";
var crypter = require('@eskygo/koala-puree').Spices.Crypt,
    debug = require('debug')('eskygo:13dian:models:IPWorkerLease');

class IPWorkerLease {
    constructor(s) {
		s.string('data',{required: true}),
		s.string('status',{required: true, default: 'pending'}),
		s.integer('retries',{required: true, default:0}),
		s.date('next_run',{required: true, default: Date.now}),
		s.string('job',{required: true}),
        s.timestamps();
    }
}

module.exports = IPWorkerLease;
