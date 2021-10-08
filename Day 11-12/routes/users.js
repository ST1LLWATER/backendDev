var express = require("express");
var router = express.Router();
const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "12345678",
  port: "5432",
});
/* GET users listing. */
router.get("/users", function (req, res, next) {
  pool.query('SELECT * FROM "Users"', (err, res) => {
    if (err) {
      console.log("Error Querying: ", err);
    } else {
      console.log(res);
    }
  });
  res.send("respond with a resource");
});

module.exports = router;
