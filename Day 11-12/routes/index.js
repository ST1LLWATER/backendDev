var express = require("express");
var router = express.Router();
let registerChecks = require("../middlewares/registerChecks");
let register = require("../controllers/register");

/* GET home page. */
router.get("/", function (req, res, next) {
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
