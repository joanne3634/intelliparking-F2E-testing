"use strict";
exports.name = "CreateIntelliparkingJobEventVertex";

exports.up = function (db) {
    // @todo implementation
    return db.class.create('IPJobEvent', 'V')
        .then(function(c){
            return Promise.all([
                Promise.resolve(c),
                c.property.create({name: 'pid', type: 'string', mandatory: true}),
                c.property.create({name: 'name', type: 'string', mandatory: true}),
                c.property.create({name: 'machine', type: 'string', mandatory: true}),
                c.property.create({name: 'event', type: 'string', mandatory: true}),
                c.property.create({name: 'os', type: 'string', mandatory: true}),
                c.property.create({name: 'runningAs', type: 'string', mandatory: true}),
                c.property.create({name: 'env', type: 'string', mandatory: true}),
                c.property.create({name: 'message', type: 'string', mandatory: true}),
                c.property.create({name: 'created_at', type: 'DateTime', mandatory: true}),
                c.property.create({name: 'updated_at', type: 'DateTime', mandatory: true})
            ]);
        })
};

exports.down = function (db) {
    // @todo implementation
    return db.class.drop('IPJobEvent');

};