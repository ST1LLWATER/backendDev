const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded());

const checkAdmin = (req, res, next) => {
  if (req.query.admin === "true") {
    res.status(200);
    // res.json(req.query);
    next();
  } else {
    res.send("You Aint Admin LMAO");
  }
};

const sendRes = (req, res) => {
  res.json({ query: req.query });
};

app.use(express.static("./public"));

app.use("/", checkAdmin, sendRes);

app.use("/addProduct", (req, res, next) => {
  console.log("Add Product Page");
});

app.use("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

// app.use("/", (req, res, next) => {
//   res.send("<h1>Welcome To Home</h1>");
// });

app.listen(3000);

//Sequence Matters
