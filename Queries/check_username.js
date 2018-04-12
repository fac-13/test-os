const dbConnection = require("../database/db_connection.js");

const check_username_exists = (username, cb) => {
  dbConnection.query(
    `SELECT CASE WHEN EXISTS(SELECT username FROM users WHERE username = $1) THEN CAST (true AS BOOLEAN) ELSE CAST (false AS BOOLEAN) END`,
    [username],
    (err, res) => {
      if (err) cb(err);
      else cb(null, res.rows);
    }
  );
};

module.exports = check_user_exists;
