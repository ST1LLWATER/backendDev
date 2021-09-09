const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded());

app.use(express.static("./public"));

app.use("/addProduct", (req, res, next) => {
  console.log("Add Product Page");
});

app.use("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

app.use("/", (req, res, next) => {
  res.send("<h1>Welcome To Home</h1>");
});

app.listen(3000);

//Sequence Matters
