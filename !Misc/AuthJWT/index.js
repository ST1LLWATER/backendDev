const express = require("express");

const app = express();

//Import Routes
const authRoute = require("./routes/auth");

//Route Middlewares
app.use("/api/register", authRoute);

app.listen(3000, () => {
  console.log("Server Up And Running On Port 3000");
});
