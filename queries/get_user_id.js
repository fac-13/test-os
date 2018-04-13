const dbConnection = require("../src/database/db_connection.js");

const get_user_id = (username, cb) => {
  dbConnection.query(
    `SELECT id FROM users WHERE username = $1`,
    [username],
    (err, res) => {
      if (err) cb(err);
      else cb(null, res.rows);
    }
  );
};

module.exports = get_user_id;
