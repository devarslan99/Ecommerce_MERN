import express from "express";
import {registerController,loginController,testController} from "../controllers/authController.js"
import { isAdmin, requireSignIN } from "../middlewares/authMiddleware.js";

const router=express.Router();

// Register///Method POST

router.post('/register',registerController);

//login //post
router.post('/login',loginController);
router.get('/test',requireSignIN,isAdmin,testController);


export default router