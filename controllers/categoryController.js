import slugify from "slugify"
import categoryModel from "../models/categoryModel.js"

export const createCategoryController = async (req, res) => {

    try {

        const { name } = req.body
        if (!name) {
            return res.status(400).send({

                success: false,
                message: "name is required"
            })
        }
        const existing = await categoryModel.findOne({ name })

        if (existing) {
            return res.status(200).send({
                success: true,
                message: "category already exist"
            })
        }

        const category = await new categoryModel({ name, slug: slugify(name) }).save()
        return res.status(201).send({
            success: true,
            message: "new category created",
            category


        })

    } catch (error) {
        console.log(error)
        res.status(500).send({

            success: false,
            error,
            message: 'error in category'

        })
    }


}


export const updateCategoryController = async (req, res) => {

    try {
        const { name } = req.body
        const { id } = req.params

        const category = await categoryModel.findByIdAndUpdate(

            id,
            { name, slug: slugify(name) },
            { new: true }

        )

        res.status(201).send({
            success: true,
            message: "updated successfully",
            category

        })


    } catch (error) {
        console.log(error)
        res.status(500).send({

            success: false,
            message: "error while updating the category",
            error
        })
    }


}

// get all category

export const CategoryController = async (req, res) => {

    try {

        const category = await categoryModel.find({});
        res.status(200).send({
            success: true,
            message: "All category",
            category
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({

            success: true,
            message: "error in all category",
            error
        })
    }

}


export const singleCategoryController=async(req,res)=>{

try {
    
    const category=await categoryModel.findOne({slug:req.params.slug})
    res.status(200).send({
        success: true,
        message: "Successfully fetch category",
        category
    })

} catch (error) {
    console.log(error)
    res.status(500).send({

        success: true,
        message: "error in fetching category",
        error
    })
}

}


export const deleteCategoryController=async(req,res)=>{

    try {
        const{id}=req.params
      await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: "Category deleted successfully",
        })
    
    } catch (error) {
        console.log(error)
        res.status(500).send({
    
            success: true,
            message: "error while deleting category",
            error
        })
    }
    
    }