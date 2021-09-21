var express = require("express");
var router = express.Router();
let registerChecks = require("../middlewares/registerChecks");
let register = require("../controllers/register");

/* GET home page. */
router.get("/", function (req, res, next) {
  const sess = req.session;
  sess.username = "stillwater";
  res.render("index", { title: "Express" });
});

router.get("/info", function (req, res, next) {
  console.log("Redis Value: ", req.session.username);
  res.render("index", { title: "Express" });
});

// @requires{email,password,confirmPassword} -req.body
// @description{security,performance,edge cases}
// validate email : @ and .
// validate password: min 6
// JS / SQL
// check if email already exists
// hash password
// email lowercase convert
// save

router.post("/register", registerChecks, register);

module.exports = router;
