const dbConnection = require("../src/database/db_connection.js");

const register_destination = (country, city, cb) => {
  dbConnection.query(
    `INSERT INTO destinations(country, city) VALUES ($1, $2)`,
    [country, city],
    err => {
      if (err) {
        cb(err);
      } else {
        cb(null, "destination");
      }
    }
  );
};

module.exports = register_destination;
