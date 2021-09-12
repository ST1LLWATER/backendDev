const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded());

app.use(adminRoutes);
app.use(shopRoutes);
app.use((req, res) => {
  res.status(404).send("<h1>Error 404 Lmao Ded Brick Not Found</h1>");
});

// app.use("/", checkAdmin, sendRes);

// const sendRes = (req, res) => {
//   res.json({ query: req.query });
// };

app.listen(3000);

//Sequence Matters
