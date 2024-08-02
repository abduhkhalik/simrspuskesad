const express = require("express");
const mongoose = require("mongoose");
const User = require("./schema/User");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require('bcrypt');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
dotenv.config();

mongoose
  .connect(process.env.MONGO_BASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Database Connected!!"))
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });

app.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      password: hashedPass,
      peran: req.body.peran,
    });
    const user = await newUser.save();

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
  }
});

// Login User
app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(400).json("Username or Password is incorrect");
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json("Username or Password is incorrect");
    }

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

app.listen(8000, () => {
  console.log("Server Jalan");
});
