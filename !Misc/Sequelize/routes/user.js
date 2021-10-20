const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authenticateToken = require("../middlewares/authenticateToken");
const { User } = require("../models");
require("dotenv").config();
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    // Get user input
    const { firstName, lastName, email, password } = req.body;

    // Validate user input
    // if (!(email && password && firstName && lastName)) {
    //   res.status(400).send("All input is required");
    // }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ where: { email } });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token

    console.log(user.firstName);

    const token = jwt.sign(
      { userId: user.id, role: user.role, name: user.firstName, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // return new user
    return res
      .cookie("access_token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: true,
      })
      .status(200)
      .json({ message: "Registered Successfully", token, user });
  } catch (err) {
    console.log(err);
  }
});

router.get("/register", (req, res) => {
  let locals = {
    title: "Register",
  };
  res.render("register", locals);
});

router.post("/login", async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.send("Email Not Found, Please Register");
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { userId: user.id, role: user.role, name: user.firstName, email },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "2h",
        }
      );

      return res
        .cookie("access_token", token, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          secure: true,
          sameSite: true,
        })
        .status(200)
        .json({ message: "Login Successful", token, user });
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/logout", authenticateToken, (req, res) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully Logged Out" });
});

router.get("/showall", authenticateToken, async (req, res) => {
  try {
    const users = await User.findAll();
    return res.json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something Went Wrong" });
  }
});

router.get("/:uuid", async (req, res) => {
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

router.delete("/:uuid", async (req, res) => {
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

router.put("/:uuid", async (req, res) => {
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

module.exports = router;
