import express from "express";
import {registerController,loginController} from "../controllers/authController.js"


const router=express.Router();

// Register///Method POST

router.post('/register',registerController);

//login //post
router.post('/login',loginController);


export default router