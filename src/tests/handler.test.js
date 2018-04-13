require('env2')('./.env');
const { TEST_PASSWORD } = process.env
const test = require('tape');
const supertest =  require('supertest');
const buildTestDb = require('../database/test_db_build');


test('Tape is working', (t) => {
  t.ok(true, 'tape is working');
  t.end();
})