const dbConnection = require("../src/database/db_connection.js");

const get_comments = (cb) => {
  dbConnection.query(
  `SELECT comments.comment, destinations.country, destinations.city FROM comments INNER JOIN destinations ON comments.destid = destinations.id`, (err, res) => {
        if (err) {
            cb(err);
        } else {
            cb(null, res.rows);
        }
    });
};

module.exports = get_comments;
