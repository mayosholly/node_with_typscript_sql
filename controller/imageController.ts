import { Request, Response } from "express"

export const uploadController = (req: Request, res: Response) => {
    if(req.file && req.file.filename){
        res.status(200).json({
            message: "Success",
            url: `${process.env.APP_URL}/uploads/${req.file.filename}`
        })
    }else{
        res.status(500).json({
            message: "Failed"
        })
    }
}