import express from "express";
import {registerController,loginController,testController} from "../controllers/authController.js"
import { isAdmin, requireSignIN } from "../middlewares/authMiddleware.js";

const router=express.Router();

// Register///Method POST

router.post('/register',registerController);

//login //post
router.post('/login',loginController);
router.get('/test',requireSignIN,isAdmin,testController);

// protected auth route
router.get('/user-auth',requireSignIN,(req,res)=>{

res.status(201).send({ok:true});

});



export default router