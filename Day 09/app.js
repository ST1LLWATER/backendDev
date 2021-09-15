const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "./public")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "rengoku.jpg"));
});

app.listen(3000);
