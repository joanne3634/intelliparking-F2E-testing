"use strict";
exports.name = "AddIntelliparkingWorkerLeaseStatusIndex";

exports.up = function (db) {
    return db.index.create([{name:'IPWorkerLease.status', type: 'notunique'}])
};

exports.down = function (db) {
    return db.index.drop('IPWorkerLease.status')
};

