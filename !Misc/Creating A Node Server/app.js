const http = require("http"); // HTTP Inbuilt Module Imported To Create Server

const server = http.createServer((req, res) => {
  // createServer Method Which Returns a Server, Takes A Function Which Runs
  console.log(req); // Whenever A Req Is Sent. The Function Takes 2 Patameters i.e. Request and Response.
});

server.listen(3000); // Making the Server Listen To A Port.
