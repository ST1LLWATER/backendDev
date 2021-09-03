const http = require("http");
const fs = require("fs");
const routes = require("./routes");

const server = http.createServer(routes);

server.listen(3000);

// The http.createServer() method turns your computer into an HTTP server.

// The http.createServer() method creates an HTTP Server object.

// The HTTP Server object can listen to ports on your computer and execute a function, a requestListener, each time a request is made.
