//auth , isStudent , isAdmin

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    //extract jwt token

    console.log("cookie",req.cookies.token);
    console.log("body",req.body.token);
    // console.log("header",req.header("Authorization"));

    const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token Misssing ",
      });
    }

    //verify the token
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      console.log(payload);
      req.user = payload;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token is Invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
        success:false,
        message:"Something went Wrong while Verifying the Token"
    })
  }
};




exports.isStudent  =  (req,res,next)=>{
    try{
        if(req.user.role !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is not Protected Route for the Student",
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'User role is not matching',
        })
    }
}


exports.isAdmin  =  (req,res,next)=>{
    try{
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is not Protected Route for the Admin",
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'User role is not matching',
        })
    }
}