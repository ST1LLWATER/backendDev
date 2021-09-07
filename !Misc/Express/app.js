const http = require("http");

const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("In The MiddleWare!");
  next(); // Allows The Req To Proceed To Next Middleware In line...
});

app.use((req, res, next) => {
  console.log("In Another MiddleWare!");
  res.send("<h1>Hello From Express Side</h1>");
});

const server = http.createServer(app);

server.listen(3000);
