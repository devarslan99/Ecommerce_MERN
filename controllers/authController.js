import userModel from "../models/userModel.js";
import {comparePassword, hashpassword} from "./../helpers/authHelper.js";
import jwt from "jsonwebtoken";

export const registerController=async(req,res)=>{

try {
    
const {name,email,password,phone,address,answer}=req.body

if(!name){

    return res.send({message:"name is required"})
}

if(!email){

    return res.send({message:"email is required"})
}
if(!password){

    return res.send({message:"password is required"})
}
if(!phone){

    return res.send({message:"phone is required"})
}
if(!address){

    return res.send({message:"address is required"})
}
if(!answer){

    return res.send({message:"answer is required"})
}

// check user

const existingUser=await userModel.findOne({email});
//existing user
if(existingUser){

  return  res.status(200).send({

    success:false,
    message:'Already register please login'
  });
  
}

///register user

const hashedpassword=await hashpassword(password);

const user=await new userModel({name,email,phone,address,password:hashedpassword,answer}).save();

res.send({

    success:true,
    message:'user register successfully',
    user
})








} catch (error) {
    console.log(error);
    res.status(500).send({

        success:false,
        message:"error in registeration",
        


    })

}

}

////post login


export const loginController=async(req,res)=>{

try {
    
const {email,password}=req.body;
if(!email||!password){

  return res.status(404).send({

    success:false,
    message:"invalid email or password",


})}

/////get user by email
const user=await userModel.findOne({email});

if(!user){

    return res.status(404).send({

        success:false,
        message:"user does not exist",
        
    
    })
    
}

const match=await comparePassword(password,user.password);
if(!match){

    return res.status(200).send({

        success:false,
        message:"invalid password",
        
    })
}

////create token
const token= await jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})

return res.status(200).send({

    success:true,
    message:"login successfully",
   user:{
     name:user.name,
     email:user.email,
     phone:user.phone,
     address:user.address
   },
   token
})

} catch (error) {
    console.log(error);
    res.status(500).send({

     success:false,
     message:"error in login",
     error

    })
}


}


///////forgot password controller

export const forgotPasswordController = async (req, res) => {
    try {
      const { email, answer, newPassword } = req.body;
      if (!email) {
        res.status(400).send({ message: "Email is required" });
      }
      if (!answer) {
        res.status(400).send({ message: "answer is required" });
      }
      if (!newPassword) {
        res.status(400).send({ message: "New Password is required" });
      }
      //check
      const user = await userModel.findOne({ email, answer });
      //validation
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Wrong Email Or Answer",
        });
      }
      const hashed = await hashpassword(newPassword);
      await userModel.findByIdAndUpdate(user._id, { password: hashed });
      res.status(200).send({
        success: true,
        message: "Password Reset Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Something went wrong",
        error,
      });
    }
  };
  



///////test controller

export const testController=(req,res)=>{

    try {
    res.send('protected route');
        
    } catch (error) {
        console.log(error);
        res.send({error});
    }
}


