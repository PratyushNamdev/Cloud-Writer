const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwtKey = "thisisout$oken";
const decodingToken = require("../Middleware/decodingToken");
//this is the signup route
router.post(
  "/signup",
  [
    //validation of the data
    body("name").isLength({ min: 3 }),
    body("email").isEmail().withMessage("Please enter a valid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password must be set of atleast 5 letters"),
  ],
  async (req, res) => {
    //cheching for any errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(401).send({ error: "Email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      //hashing the password
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      //The payload of the jwt
      const data = {
        user: {
          id: user.id,
        },
      };
      //creating the token
      let authToken = jwt.sign(data, jwtKey);
      res.json({ authToken , user });
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Some Errored Occured" });
    }
  }
);

//this is the login route
router.post(
  "/login",
  [body("email").isEmail().withMessage("Please enter a valid Email")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).send({ error: "Enter valid credentials ..." });
      }
      //checking the password
      let check = await bcrypt.compare(password, user.password);
      if (!check) {
        return res.status(400).send({ error: "Enter valid credentials ..." });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      let authToken = jwt.sign(data, jwtKey);
      res.json({ authToken  , user});
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: "Some Errored Occured" });
    }
  }
);

//this is the third route
router.post("/getuser", decodingToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: "Internal server Error" });
  }
});

module.exports = router;
