const express = require("express");

const app = express();

app.use("/users", (req, res, next) => {
  res.send("<h1>Middleware Handling /users</h1>");
});

app.use("/", (req, res, next) => {
  res.send("<h1>Middleware Handling /</h1>");
});

app.listen(3000);

//Sequence Matters
