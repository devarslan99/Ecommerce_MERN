import express  from "express";
import { isAdmin, requireSignIN } from "../middlewares/authMiddleware.js";
import { createProductController, deleteProductController, getProductController, getSingleProductController, productPhotoController, updateProductController } from "../controllers/productController.js";
import formidable from "express-formidable";

const router=express.Router()

router.post('/create-product',requireSignIN,isAdmin,formidable(),createProductController)

router.get('/get-product',getProductController)
router.get('/get-product/:slug',getSingleProductController)
router.get('/product-photo/:pid',productPhotoController)
router.delete('/product/:pid',deleteProductController)

router.put('/update-product/:pid',requireSignIN,isAdmin,formidable(),updateProductController)
export default router