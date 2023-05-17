const express = require("express");
const router = express.Router();


//creating route for login and SignUp
const { login, signup } = require("../Controllers/Auth");
const { auth, isStudent, isAdmin } = require("../middlewares/auth");

router.post("/login", login);
router.post("/signup", signup);



//single Route for single Middleware
router.get("/test", auth, (req, res) => {
  res.json({
    success: true,
    message: `Welcome to the Protected Route for Students`,
  });
});


//protected Route for The student
router.get("/student", auth, isStudent, (req, res) => {
  res.json({
    success: true,
    message: `Welcom to the Protected Route for student`,
  });
});


//Protected Route for Admin
router.get("/admin", auth, isAdmin, (req, res) => {
  res.json({
    success: true,
    message: `Welcom to the Protected Route for Admin`,
  });
});

module.exports = router;
