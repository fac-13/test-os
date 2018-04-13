const dbConnection = require("../src/database/db_connection.js");

const register_user = (username, hashedpass, cb) => {
  console.log("Db paswd = ",hashedpass);
  dbConnection.query(
    `INSERT INTO users(username, password) VALUES ($1, $2)`,
    [username, hashedpass ],
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
