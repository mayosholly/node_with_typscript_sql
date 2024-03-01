import { Request, Response } from "express"
import models from "../models"
import  {CreatePost} from "../dto" 
import Validator from "fastest-validator"

export const index = async (req:Request, res:Response) => {
    try {
        const posts = await models.Post.findAll({
            include: [
                {
                    model: models.User,
                    as: 'author', // Make sure you use the alias defined in your association
                    attributes: ['id', 'name', 'email'], // Specify the attributes you want to include
                },
                {
                    model: models.Category,
                    as: 'postCategory', // Make sure you use the alias defined in your association
                    attributes: ['id', 'name'], // Specify the attributes you want to include
                },
            ],
        })
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

export const save = async (req:Request, res:Response) => {
    const {title, content, imageUrl, categoryId} = <CreatePost> req.body;
    const userId = req.userData.userId;
    
    const schema = {
        title: { type: "string", optional: false, max: 100 },
        content: { type: "string", optional: false, max: 100 },
        categoryId: { type: "number", optional: false },
        imageUrl: { type: "string", optional: true },
    };

    const validator = new Validator();
    const validationResponse = validator.validate({ title, content, categoryId, imageUrl }, schema); // Validate the correct object

    if (validationResponse !== true) {
        return res.status(400).json({
            message: 'Validation Failed',
            errors: validationResponse,
        });
    }


    try {
        const categoryExists = await models.Category.findByPk(categoryId);
        if (!categoryExists) {
            return res.status(400).json({
                message: 'Category does not exist',
            });
        }

        const result = await models.Post.create({
            title,
            content,
            imageUrl,
            categoryId,
            userId,
        });        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ error: error})
    }

}



export const show = async (req: Request, res: Response) => {
    const id =  req.params.id;
    try {
        const post = await models.Post.findByPk(id, {
            include: [
                {
                    model: models.User,
                    as: 'author', // Make sure you use the alias defined in your association
                    attributes: ['id', 'name', 'email'], // Specify the attributes you want to include
                },
                {
                    model: models.Category,
                    as: 'postCategory', // Make sure you use the alias defined in your association
                    attributes: ['id', 'name'], // Specify the attributes you want to include
                },
            ],
        });
        if(post) {
            res.status(200).json({
                message: "Success",
                data: post
            })
        }else{
            res.status(404).json({
                message: "Post not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            error: error
        })       
    }
}
  
export const update = async(req:Request, res:Response) => {
    const {title, content, imageUrl, categoryId} = <CreatePost> req.body;
    const userId = req.userData.userId;
    const id : any = req.params.id;
    try {
        const post = await models.Post.update({
            title,
            content,
            imageUrl,
            categoryId,
            userId,
        }, {where: {"id": id}});
        res.status(200).json({
            message: "Success",
            data: await models.Post.findByPk(id)
        })
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }   
}

export const destroy = async(req:Request, res:Response) => {
    const id : string = req.params.id;
    try {
        const post = await models.Post.destroy({where: {"id": id}});
        res.status(200).json({
            message: "Successfully Deleted"
                })    
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}