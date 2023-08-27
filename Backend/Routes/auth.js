const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const otpModel = require("../Models/OtpVerification");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwtKey = "thisisout$oken";
const decodingToken = require("../Middleware/decodingToken");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "pratyushnamdev140@gmail.com",
    pass: "qwrawyscpgganeod",
  },
});
const sendOTPverificationEmail = async (_id, email, res) => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const mailOptions = {
      from: "pratyushnamdev140@gmail.com",
      to: email,
      subject: "Verify yout E-mail",
      html: `<p>Enter ${otp} in the app to verify</p>`,
    };
    const salt = await bcrypt.genSalt(10);
    const hashOTP = await bcrypt.hash(otp, salt);
    await otpModel.create({
      userId: _id,
      otp: hashOTP,
      createdAt: Date.now(),
      expiresOn: Date.now() + 360000,
    });
    // console.log(otp1)
    // console.log(mailOptions)
    await transporter.sendMail(mailOptions).then(() => {
      res.json({ needVerificationstatus: true, id: _id });
    });
  } catch (error) {
    res.json({status:false , id:null})
  }
};

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
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      }).then((user) => {
        sendOTPverificationEmail(user._id, user.email, res);
      });
      // //The payload of the jwt
      // const data = {
      //   user: {
      //     id: user.id,
      //   },
      // };
      // //creating the token
      // let authToken = jwt.sign(data, jwtKey);
      // res.json({ authToken , user });
    } catch (err) {
      
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
        return res.status(400).send({ error: "sign up required" });
      }
      if(!user.verified){
     
        await otpModel.deleteMany({userId : user._id})
        return sendOTPverificationEmail(user._id , user.email , res);
        
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
      res.json({ authToken, user , needVerificationstatus:false});
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

router.post("/verifyOTP", async (req, res) => {
  try {
    const { userId, otp } = req.body;
    console.log(userId  , otp)
    if (!userId || !otp) {
      return res.json({ error: "Invalid request" });
    }

    let otpRecord = await otpModel.findOne({ userId });
    
    if (!otpRecord) {
      return res.json({
        error: "Email is already verified or not exist try by singin up again",
      });
    }
    if(otpRecord.expiresOn < Date.now()){
     
      await otpModel.deleteMany({userId});
      return res.json({
        error: "OTP expired",
      }); 
    }
    const validOTP = await bcrypt.compare(otp , otpRecord.otp)
    if(!validOTP){
      return res.json({
        error: "Incorrect OTP"
      }); 
    }
    await User.updateOne({_id:userId} , {verified:true})
    await otpModel.deleteMany({userId});
    res.json({status:true})
  } catch (e) {
    res.json({status : false})
  }
});
module.exports = router;
