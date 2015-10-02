"use strict";
exports.name = "AddCreatedAtIndexToIntelliparkingJobEvent";

exports.up = function (db) {
    // @todo implementation
    return db.index.create({name: 'IPJobEvent.created_at', type: 'notunique', class:'IPJobEvent', properties: ['created_at']})
};

exports.down = function (db) {
    return db.index.drop('IPJobEvent.created_at')
};