const express = require("express");
require("dotenv").config({ path: "../Config/.env" });

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();
const User = require("../models/User");

const isAuth = require("../middlewares/isAuth");

const {
  validator,
  registerRules,
  loginRules,
} = require("../middlewares/validator");
//@route POST api/auth/register
//@desc Register new user
//@access Public
//localhost:5000/api/auth/register
router.post("/register", registerRules(), validator, async (req, res) => {
  const { name, lastName, email, password } = req.body;
  try {
    // if (!name || !lastName || !email || !password) {
    //   return res.status(400).json({ msg: "please enter all fields" });

    // }
    // Check for existing user
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    // Create new User
    user = new User({ name, lastName, email, password });
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    // Save the user
    await user.save();

    const payload = {
      id: user._id,
    };
    // Generate token
    const token = await jwt.sign(payload, process.env.secretOrKey, {
      expiresIn: "7 days",
    });

    res
      .status(201)
      .json({ msg: `${name} register with success`, data: user, token });
  } catch (error) {
    res.status(400).json({ msg: "server error " });
  }
});

//@route POST api/auth/login
//@desc Login User
//@access Public
router.post("/login", loginRules(), validator, async (req, res) => {
  const { email, password } = req.body;
  try {
    // if (!email || !password) {
    //   return res.status(400).json({ msg: "Please enter all fields" });
    // }
    //  Check for existing email
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ msg: "Bad Credentials! email" });
    }
    //  Check  password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send({ msg: "bad Credentials!password" });
    }
    const payload = {
      id: user._id,
    };
    //   Génrération Token in login
    const token = await jwt.sign(payload, process.env.secretOrKey, {
      expiresIn: "7 days",
    });

    res.send({
      msg: "user login with success",
      data: user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ msg: "server error" });
  }
});
router.get("/user", isAuth, (req, res) => {
  res.status(200).send({ data: req.user });
});
module.exports = router;
