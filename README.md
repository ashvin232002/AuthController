# AuthController

-->so basically This is AuthController where a user's SignUp and Login Fuctionality would be implemented.<br/>
-->Here  all The fuctionality would be included ---> <br/>

<br/>
<br/>
1.password encryption<br/>
2.Implemented jwt (jsonwebtoken)<br/>
3.Implemented Cookies.<br/>
4.Implemented Login Through the jwt and cookies<br/>

-->file structure <br/>
1.config folder  ---   For the DataBase<br/>
2.models folder ---> For the Schema <br/>
3.Controller folder --> Basically all the fuctionality for the Login & signUp <br/>
4.Router folder --> To create the different Routes <br/>
5.Middlewares  -->login through the jwt and cookies <br/>
6.create  a .env file to define PORT , MONGODB_URL , JWT_SECRET <br/>


-->how to run<br/>
1. npm init -y <br/>
2. npm i express <br/>
3. npm i nodemon <br/>
4. npm i bcrypt <br/>
5. npm i dotenv <br/>
6. npm i mongoose <br/>


here additional Functionality would be created a protected Route for the authorization like student,Admin ..


