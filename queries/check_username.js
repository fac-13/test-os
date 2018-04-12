<<<<<<< HEAD:Queries/check_username.js
const dbConnection = require("../Src/Database/db_connection.js");
=======
const dbConnection = require("../src/database/db_connection.js");
>>>>>>> 2fde71991865fde6de9bf79687c168bddff322d5:queries/check_username.js

const check_user_exists = (username, cb) => {
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
