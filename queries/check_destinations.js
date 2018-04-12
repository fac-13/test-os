const dbConnection = require("../src/database/db_connection.js");

const check_destination_exists = (city, cb) => {
  dbConnection.query(
    `SELECT CASE WHEN EXISTS(SELECT city FROM destinations WHERE city = $1) THEN CAST (true AS BOOLEAN) ELSE CAST (false AS BOOLEAN) END`,
    [city],
    (err, res) => {
      if (err) cb(err);
      else cb(null, res.rows);
    }
  );
};

module.exports = check_destination_exists;
