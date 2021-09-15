const express = require("express");
const { appendFile } = require("fs");
const path = require("path");

const router = express.Router();

const checkAdmin = (req, res, next) => {
  if (req.query.admin === "true") {
    res.status(200);
    next();
  } else {
    res.send("<center>You Aint Admin LMAO</center>");
  }
};

router.get("/add-product", checkAdmin, (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "views", "add-product.html"));
  // res.sendFile("../views/add-product.html");
  console.log("Add Product Page");
});

router.use("/product", checkAdmin, (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
