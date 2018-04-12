const dbConnection = require("../src/database/db_connection.js");

const register_comment = (comment, userId, destId, cb) => {
  dbConnection.query(
    `INSERT INTO comments(comment, userId, destId) VALUES ($1, $2, $3)`,
    [comment, userId, destId],
    err => {
      if (err) {
        cb(err);
      } else {
        cb(null, "new comment");
      }
    }
  );
};

module.exports = register_comment;
