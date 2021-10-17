const express = require("express");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const { sequelize, User, Post } = require("./models");
const userRoutes = require("./routes/user");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/user", userRoutes);

app.post("/posts", async (req, res) => {
  const { userUuid, body } = req.body;
  try {
    const user = await User.findOne({ where: { uuid: userUuid } });

    const post = await Post.create({ body, userId: user.id });

    return res.json(post);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
// { include: [User] }
app.get("/posts", async (req, res) => {
  try {
    const users = await Post.findAll({
      include: "users",
    });
    // const users = await User.findAll();

    return res.json({ users });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.get("/user-posts/:uuid", async (req, res) => {
  const uuid = req.params.uuid;

  try {
    const user = await User.findOne({
      where: { uuid },
      include: "posts",
    });

    return res.json(user.posts);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.listen({ port: 5000 }, async () => {
  console.log("Server Running On Port 5000");
  await sequelize.authenticate();
  console.log("Database Connected");
});
