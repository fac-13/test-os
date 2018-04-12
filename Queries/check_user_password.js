const databaseConnection = require("../database/db_connections.js");

const check_user_password = (username, cb) => {
  databaseConnection.query(
    `SELECT password FROM users WHERE username=$1`,
    [username],
    (err, res) => {
      if (err) cb(err);
      else cb(null, res);
    }
  );
};

module.exports = check_user_password;
