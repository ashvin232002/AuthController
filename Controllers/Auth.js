
// so basically These is a Controller where Login and SignUp functionality Would be Implemented 


//importing bcrypt library 
const bcrypt = require("bcrypt");

//to perform operation importing model
const User = require("../models/User");
const jwt = require("jsonwebtoken");

//importing .env file
require("dotenv").config();

//signUp Route Handler
exports.signup = async (req, res) => {
  try {
    //get data
    const { name, email, password, role } = req.body;


    //check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already Exists",
      });
    }


    //secure password using Bcrypt Library
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error while Hashing Password",
      });
    }


    //creating user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    //we have success Fully Created our SignUp user
    return res.status(200).json({
      success: true,
      message: `User Created SuccessFully`,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      success: false,
      message: `Error While Creating User`,
    });
  }
};





//login
exports.login = async (req, res) => {
  try {
    //data fetch from req body
    const { email, password } = req.body;

    //validation on email and password if any field is incomplete
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: `Please Fill all The details Carefully`,
      });
    }


    //check for registered user
    let user = await User.findOne({ email });


    //if user haven't signedUp
    if (!user) {
      return res.status(401).json({
        success: false,
        message: `Please Sign IN first`,
      });
    }



    //verify password and generate a JWT token (jsonwebToken)
    //jwt (payload,secreat Key ,Header)
    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };

    //comparing password
    if (await bcrypt.compare(password, user.password)) {

      //password match
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });



      //importing the token into the user Object
      // console.log(user);
      user = user.toObject();
      user.token = token;
      // console.log(user);
      user.password = undefined;
      // console.log(user);

      //creating options for the cookie
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      //cookie parameters(name,jwttoken,option)
      res.cookie("AshvinCookie", token, options).status(200).json({
        success: true,
        token,
        user,
        message: `User Loged in successfully and created token`,
      });
    } else {
      //password don not match
      return res.status(403).json({
        success: false,
        message: "Password Do not match try again later",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error While loging",
    });
  }
};
