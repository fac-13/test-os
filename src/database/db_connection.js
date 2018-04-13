const {Pool} = require('pg');
const url = require('url');
require('env2')('./.env');

let DB_URL = process.env.DB_URL;
// if (process.env.NODE_TEST='test') {
//     DB_URL = process.env.TEST_DB_URL;
// }

if (!DB_URL) throw new Error("Environment variable DB_URL must be set");

const params = url.parse(DB_URL);
const [user, password] = params.auth.split(':');

let options = {
    host: params.hostname,
    port: params.port,
    database: params.pathname.split("/")[1],
    max: process.env.DB_MAX_CONNECTIONS || 2,
    user,
    password
};

options.ssl = options.host !== "localhost";

if (process.env.TRAVIS === 'true') {
    options = {
        database: 'travis_ci_test',
        user: 'postgres'
    }
}

module.exports = new Pool(options); 