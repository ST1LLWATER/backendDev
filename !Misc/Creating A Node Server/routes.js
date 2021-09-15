const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

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

  if (url === "/message" && method === "POST") {
    const body = [];
    // res.setHeader("refresh", "2;url=/");
    res.setHeader("Content-Type", "text/html");
    res.write(fs.readFileSync("./index.html", "utf-8"));
    res.end();
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        if (err) {
          console.log("Failed Due To:", err);
        }
      });
    });
  }
};

module.exports = requestHandler;
