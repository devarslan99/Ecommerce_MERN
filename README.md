                Ecommerce MERN stack

Prerequisites

Node latest version above then 18
Npm version 9
MongoDB  install (community server)
Create folder 
Open in VS code
Install the extension namely (ES7+React Native Redux React native snippets)
Html to Jsx extensions
Prettier code extension
Go to setting and check “format on save”
Go to the terminal and run command npm init -y 
 
And update the package.json as 
 
  {
  "name": "ecommerce_mern",
  "version": "1.0.0",
  "description": "ecommerce rest api",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
     "server": "nodemon server.js"
    
  },
  "keywords": [],
  "author": Dev Arslan",
  "license": "ISC"
}


npm i express
npm i colors
Create server.js file and write the code as below

const express = require("express");
// rest object
const app = express();


//rest api
app.get('/', (req, res) => {


    res.send(
        {
            message: "welcome to ecommerce app"
        }
    );


});


const PORT=8080;
app.listen(PORT,()=>{


    console.log(`port running on ${PORT}`);


});


And now run the command npm start
Now check at localhost:8080
npm i nodemon
Stop terminal by ctrl+c and run the command nodemon server.js
And the project run on localhost:8080

            Now change to type module

{
  "name": "ecommerce_mern",
  "version": "1.0.0",
  "description": "ecommerce rest api",
  "main": "server.js",
  "type":"module",
  "scripts": {
    "start": "node server.js",
    "server":"nodemon server.js"
  },
  "keywords": [],
  "author": "dev arslan",
  "license": "ISC",
  "dependencies": {
    "colors": "^1.4.0",
    "express": "^4.18.2",
    "nodemon": "^3.0.1"
  }
}

 Also server.js


Import express from "express";
Import colors from "colors";
// rest object
const app = express();


//rest api
app.get('/', (req, res) => {


    res.send("<h1>welcome to ecommerce app</h1>" );


});


const PORT=8080;
app.listen(PORT,()=>{


    console.log(`port running on ${PORT}`.bgCyan.white);


});

Create a .env file and write PORT=8080
npm i dotenv
Configure it in server.js by import dotenv from “dotenv”
Also write dotenv.config()
Also const PORT=process.env.port || 8080



 Go to mongo db atlas 
Click on build database and go to MO
Select aws and name the cluster according to you (whatever you want)
After creating cluster go to collection and  create collection namely as “users” .also create database
 You can create database access user by going to  Database Access
Go to network access and add ip 0.0.0.0./0
Go to cluster  and click on connect and choose compass and and copy string
Go to env and write MONGO_URL = string
Now go to mongo compass and click on connection and paste this string and connect
Now we install two packages mongoose and morgan ,mongoose use for manipulate the document of database and morgan show our api call in console
Run command “npm i mongoose morgan”
Make folder config and create file db.js and import mongoose from “mongoose”
And update the server.js as
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
// rest object
const app = express();


///configure dotenv
dotenv.config();


connectDB();




/////middleware
app.use(express.json());
app.use(morgan('dev'));








//rest api
app.get('/', (req, res) => {


    res.send("<h1>welcome to ecommerce app</h1>" );


});


const PORT=process.env.PORT||8080;
app.listen(PORT,()=>{


    console.log(`port running on ${PORT}`.bgCyan.white);


});


Our db.js should look as 
import mongoose from "mongoose";
import colors from "colors"


const connectDB=async()=>{


  try {
    const conn=await mongoose.connect(process.env.MONGO_URL);
    console.log(`connected to DB ${conn.connection.host}`.bgMagenta.white);


  } catch (error) {


    console.log(`Error in mongodb ${error}`.bgRed.white);


  }


}


export default connectDB;


Now
 Create folder namely as controllers,models,helpers,middlewares,routes
Create file in models namely as userModel.js
And write as below
import mongoose from "mongoose";


const userSchema=new mongoose.schema(


{
  name:{
    type:string,
    required:true,
    trim:true




  },
   
  email:{


    type:string,
    required:true,
    unique:true


  },
  password:{


    type:string,
    required:true,


  },
  phone:{


    type:Number,
    required:true,


  },
  address:{


    type:string,
    required:true,


  },
  role:{


    type:Number,
    default:0,


  }
},{timestamps:true}


)




export default mongoose.model('users',userSchema);


Create a router file in router folder namely as  authRoute.js 
     And paste this code below
import express from "express";


const router=express.Router();


// Register///Method POST


router.post('/register',registerController);




export default router


Now create controller file inside controller folder namely as authController
And paste 
const registerController=()=>{}


export default  registerController;

Install bcrypt using  npm i bcrypt
Create a file in helper folder namely as authHelper.js
Paste the code
import bcrypt from "bcrypt";


export const hashpassword= async(password)=>{


    try {
        const saltRounds=10;
        const hashedpassword=await bcrypt.hash(password,saltRounds);
        return hashedpassword;


    } catch (error) {
        console.log(error)
    }


}




export const comparePassword=async(password,hashedpassword)=>{


    await bcrypt.compare(password,hashedpassword);
}





