const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Form</title></head>");
    res.write(
      "<body><center><h1>Go On! Say Hi!</h1><form action='/message' method='POST'><input type='text' name='message' /><button type='submit'>Send</button></center></body>"
    );
    res.write("</html>");
    return res.end();
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Server</title></head>");
  res.write("<body><h1>Hello Written From Node.js Server</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3000);

// The http.createServer() method turns your computer into an HTTP server.

// The http.createServer() method creates an HTTP Server object.

// The HTTP Server object can listen to ports on your computer and execute a function, a requestListener, each time a request is made.
