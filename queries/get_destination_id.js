const dbConnection = require("../src/database/db_connection.js");

const get_destination_id = (city, cb) => {
  dbConnection.query(
    `SELECT id from destinations WHERE city = $1`,
    [city],
    (err, res) => {
      if (err) {
        cb(err);
      } else {
        cb(null, res.rows);
      }
    }
  );
};

module.exports = get_destination_id;
