const dbConnection = require("../src/database/db_connection.js");
const bcrypt = require("bcryptjs");

const check_user_password = (username, cb) => {
    dbConnection.query(`SELECT password FROM users WHERE username = $1`, [username], (err, res) => {
    if (err) {
      console.log(err);
      cb(err);
    } else {
      cb(null, res.rows[0].password);
    }
    });
};

module.exports = check_user_password;

