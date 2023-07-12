import userModel from "../models/userModel.js";
import {comparePassword, hashpassword} from "./../helpers/authHelper.js";
import jwt from "jsonwebtoken";

export const registerController=async(req,res)=>{

try {
    
const {name,email,password,phone,address}=req.body

if(!name){

    return res.send({error:"name is required"})
}

if(!email){

    return res.send({error:"email is required"})
}
if(!password){

    return res.send({error:"password is required"})
}
if(!phone){

    return res.send({error:"phone is required"})
}
if(!address){

    return res.send({error:"address is required"})
}

// check user

const existingUser=await userModel.findOne({email});
//existing user
if(existingUser){

  return  res.status(200).send({

    success:true,
    message:'Already register please login'
  })
}

///register user

const hashedpassword=await hashpassword(password);

const user=await new userModel({name,email,phone,address,password:hashedpassword}).save();

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
        error


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



