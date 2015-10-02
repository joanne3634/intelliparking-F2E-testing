"use strict";
exports.name = "CreateIntelliparkingWorkerLeaseClass";

exports.up = function (db) {
    // @todo implementation
    return db.class.create('IPWorkerLease', 'V')
        .then(function(c){
            return Promise.all([
                Promise.resolve(c),
                c.property.create({name: 'data', type: 'string', mandatory: true}),
                c.property.create({name: 'status', type: 'string', mandatory: true}),
                c.property.create({name: 'retries', type: 'integer', mandatory: true}),
                c.property.create({name: 'next_run', type: 'DateTime', mandatory: true}),
                c.property.create({name: 'job', type: 'string', mandatory: true}),
                c.property.create({name: 'created_at', type: 'DateTime', mandatory: true}),
                c.property.create({name: 'updated_at', type: 'DateTime', mandatory: true})
            ]);
        })
};

exports.down = function (db) {
    // @todo implementation
    return db.class.drop('IPWorkerLease');

};