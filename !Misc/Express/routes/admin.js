const express = require("express");

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
  res.send(
    '<center><form action="/product/?admin=true" method="POST"><input type="text" name="title"/><button style= type="submit">ADD</button></form></center>'
  );
  console.log("Add Product Page");
});

router.use("/product", checkAdmin, (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
