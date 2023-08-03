import express from "express";
import {registerController,loginController,testController, forgotPasswordController} from "../controllers/authController.js"
import { isAdmin, requireSignIN } from "../middlewares/authMiddleware.js";

const router=express.Router();

// Register///Method POST

router.post('/register',registerController);

//login //post
router.post('/login',loginController);
router.get('/test',requireSignIN,isAdmin,testController);

///forgot password controller//

router.post('/forgot-password',forgotPasswordController);

// protected user route
router.get('/user-auth',requireSignIN,(req,res)=>{

res.status(201).send({ok:true});

});

// protected admin route
router.get('/admin-auth',requireSignIN,isAdmin,(req,res)=>{

    res.status(201).send({ok:true});
    
    });



export default router