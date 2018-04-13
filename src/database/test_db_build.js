const fs = require('fs');
const dbConnection = require('./db_connection');

const sql = fs.readFileSync(`${__dirname}/db_build.sql`).toString();

const buildTestDb = (cb) => {
    dbConnection.query(sql, (err, res) => {
        if (err) cb(err);
        cb(null, res, dbConnection);
    })
}

module.exports = buildTestDb;