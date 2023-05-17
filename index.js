const express = require("express");
const app = express();

//dotenv Configuration
require("dotenv").config();
const PORT = process.env.PORT || 4000;


//adding a middle ware basically a Cookir-parser
const  cookieParser  =  require("cookie-parser");
app.use(cookieParser());


//adding middleware
app.use(express.json());

//connecting with DataBase
require("./config/database").connect();



//route import and mount
const user = require("./routes/user");
//mounting the router with /api/v1 so that a unique url would be given
app.use("/authcontoller/api", user);



//server Activation at the port
app.listen(PORT, (req, res) => {
  console.log(`App is listening at ${PORT}`);
});
