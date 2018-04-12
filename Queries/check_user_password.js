const dbConnection = require("../Src/Database/db_connection.js");

const check_user_password = (username, password, cb) => {
  dbConnection.query(
    `SELECT CASE WHEN EXISTS(SELECT password FROM users WHERE username = $1 AND password = $2) THEN CAST (true AS BOOLEAN) ELSE CAST (false AS BOOLEAN) END`,
    [username, password],
    (err, res) => {
      if (err) cb(err);
      else cb(null, res.rows);
    }
  );
};

module.exports = check_user_password;