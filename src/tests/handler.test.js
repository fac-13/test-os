const test = require('tape');
const supertest =  require('supertest');
const buildTestDb = require('../database/test_db_build');

const { signUpHandler } = require('../handler')

const { log } = console;
const TEST_PASSWORD = 'Password123456!';

test('Tape is working', (t) => {
  t.ok(true, 'tape is working');
  t.end();
})

test('Test signUpHandler', (t) => {

  buildTestDb((err, res, dbConnection) => {
    supertest(signUpHandler)
    .post('/post')
    .send('username=lawrence')
    .send(`password=${TEST_PASSWORD}`)
    .end((err, res) => {
      t.error(err, 'user successfully added to database');
      t.end();
      dbConnection.end();
    });
  });
  
})