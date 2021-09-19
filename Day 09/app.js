const express = require("express");
const path = require("path");
const app = express();
app.set("view engine", "pug");

app.use("/anime", express.static(path.join(__dirname, "./public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000);
