const dbConnection = require("../database/db_connection.js");

const register_user = (user, cb) => {
  dbConnection.query(
    `INSERT INTO users(name, password) VALUES ($1, $2)`,
    [
      user.username,
      user.password,
    ],
    err => {
      if (err) {
        cb(err);
      } else {
        cb(null, "signup");
      }
    }
  );
};

module.exports = register_user;
