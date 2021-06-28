'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.createTable("user", {
    // userId: { type: "int", autoIncrement: true , primaryKey: true},
    name: "string",
    role: 'string',
    classNumber: "int",
    section: "string",
    email: {type: "string", unique: true, primaryKey: true},
    password: "string",
    attendanceCount: { type: "int", defaultValue: 0 },
  });
};

exports.down = function (db) {
  return db.dropTable('user');
};

exports._meta = {
  "version": 1
};
