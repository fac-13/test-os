const dbConnection = require("../src/database/db_connection.js");
const bcrypt = require('bcryptjs');

const check_user_password = (username, password, cb) => {

  dbConnection.query(
    `SELECT password FROM users WHERE username=$1`,
    [username],
    (err, res) => {
      if (err) cb(err);
      else {
        console.log(res.rows[0].password)
        bcrypt.compare(password, res.rows[0].password, (err, boolean) => {
          console.log(boolean)
          if (err) cb(err);
          else {
            cb(null,boolean);
          }
        })
        }
    }
  );
};

module.exports = check_user_password;
