import express from "express";
import { isAdmin, requireSignIN } from "../middlewares/authMiddleware.js";
import  {CategoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController} from "../controllers/categoryController.js";

const router=express.Router();

router.post('/create-category',requireSignIN,isAdmin,createCategoryController);

router.put('/update-category/:id',requireSignIN,isAdmin,updateCategoryController)
router.get('/get-category',CategoryController)
router.get('/single-category/:slug',singleCategoryController)
router.delete('/delete-category/:id',requireSignIN,isAdmin,deleteCategoryController)

export default router;