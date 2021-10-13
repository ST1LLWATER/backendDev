const express = require("express");
const { sequelize, User, Post } = require("./models");

const app = express();
app.use(express.json());

app.post("/users", async (req, res) => {
  const { name, email, role } = req.body;

  try {
    const user = await User.create({ name, email, role });

    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    return res.json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something Went Wrong" });
  }
});

app.get("/users/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOne({
      where: { uuid },
    });
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something Went Wrong" });
  }
});

app.delete("/users/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOne({
      where: { uuid },
    });

    await user.destroy();

    return res.json({ message: "User Deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something Went Wrong" });
  }
});

app.put("/users/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  let { name, email, role } = req.body;
  try {
    const user = await User.findOne({
      where: { uuid },
    });

    if (!name) {
      name = user.name;
    }

    if (!email) {
      email = user.email;
    }

    if (!role) {
      role = user.role;
    }

    user.name = name;
    user.email = email;
    user.role = role;

    await user.save();

    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something Went Wrong" });
  }
});

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
    const users = await User.findAll({
      include: "posts",
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
