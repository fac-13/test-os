const dbConnection = require("../src/database/db_connection.js");
const bcrypt = require("bcryptjs");


const register_user = (username, password, cb) => {
  bcrypt.hash(password,10, (err, hash) => {
    if (err) cb(err);
    else {
      dbConnection.query(
        `INSERT INTO users(username, password) VALUES ($1, $2) RETURNING username`,
        [username, hash],
        (err, res) => {
          if (err) {
            cb(err);
          } else {
            cb(null, res.rows);
          }
        }
      );
    }
  })
  
};

module.exports = register_user;
