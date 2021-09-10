const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("<center><h1>Welcome To Home</h1></center>");
});

module.exports = router;
