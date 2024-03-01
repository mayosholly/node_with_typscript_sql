import models from "../models"
import {Response, Request} from "express"
import Validator from "fastest-validator"
import { CreateCategory } from "../dto"

export const categoryIndex = async (req: Request, res:Response) => {
    try {
        const categories = await models.Category.findAll()
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

export const saveCategory = async(req:Request, res:Response) => {
    const { name } = <CreateCategory> req.body

    // validate object

    const categorySchema = {
        name: {type: 'string', optional: false, max: 100}
    }
    
    const validator = new Validator();
    const categoryValidator = validator.validate({name}, categorySchema)

    if(categoryValidator !== true) {
        return res.status(400).json({
            message: 'Validation Failed',
            errors: categoryValidator,
        })
    }

    try {
        const category = await models.Category.create({name})
        res.status(200).json({
            message: "Category created successfully",
            data: category
        })
    } catch (error) {
        res.status(500).json({
            message: "Error saving category",
            data: error
        })
    }
}

export const getCategory = async (req:Request, res:Response) => {
    const id:string = req.params.id;
    try {
        const category = await models.Category.findByPk(id)
        res.status(200).json({
            message: "Category retrieved successfully",
            data: category
        })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

export const updateCategory = async(req:Request, res:Response) => {
    const id:string = req.params.id;
    const { name } = req.body as CreateCategory;
    const updateSchema = {
        name: {type:'string', optional: false, max: 100}
    }

    const validator = new Validator();
    const updateValidator = validator.validate({name}, updateSchema)

    if(updateValidator!== true) {
        return res.status(400).json({
            message: 'Validation Failed',
            errors: updateValidator,
        })
    }

   try {
    const [updateCategory] = await models.Category.update({name}, {where:{id}})

    if(updateCategory > 0){
        res.status(200).json({
            message: "Category updated successfully",
            data: await models.Category.findByPk(id)
        })
    }else{
        res.status(404).json({
            message: "Category not found"
        })
    }
   } catch (error) {
        res.status(500).json({
            error:error
        })
   }
}

export const deleteCategory = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    try {
        const rowsDeleted = await models.Category.destroy({ where: { id } });

        if (rowsDeleted > 0) {
            const deletedCategory = await models.Category.findByPk(id);
            res.status(200).json({
                message: "Category deleted successfully",
                data: deletedCategory
            });
        } else {
            res.status(404).json({
                message: "Category not found"
            });
        }
    } catch (e) {
        res.status(500).json({
            message: "Database Error",
            data: e
        });
    }
};
