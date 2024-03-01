import { Request, Response } from 'express';
import models from '../models';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { CreateUser } from '../dto';
import Validator from 'fastest-validator';

export const signup = async (req: Request, res: Response) => {
    const { name, email, password, confirmPassword } = req.body as CreateUser;
    
    const userSchema = {
        name: {type: 'string', optional:false, max:100},
        email: {type: 'email', optional:false, max:100},
        password: {type: 'string', optional:false, max:100},
        confirmPassword: { type: 'equal', field: 'password', optional: false, max: 100 },
    }
    const validator = new Validator();
    const validationResponse = validator.validate({ name, email, password,confirmPassword }, userSchema); // Validate the correct object

    if(validationResponse !== true){
        return res.status(400).json({
            message: 'Validation Failed',
            errors: validationResponse,
        })
    }

    try {

        // Check if the user already exists
        const existingUser = await models.User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                error: 'User already exists',
            });
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create the user
        const newUser = await models.User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            message: 'User created successfully',
            data: newUser,
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            message: 'Error creating user',
            error: error, // Better to include the error message for debugging
        });
    }
};



export const login = async (req: Request, res: Response) => {
    try {
        const user = await models.User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (!user) {
            return res.status(401).json({
                message: 'Invalid Credentials',
            });
        }

        bcryptjs.compare(req.body.password, user.password, function (err, result) {
            if (result) {
                const token = jwt.sign(
                    {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                    },
                    process.env.JWT_SECRET as string, //process.env.JWT_SECRET
                    {
                        expiresIn: 3600, // expires in 1 hour
                    }
                );
                res.status(200).json({
                    message: 'Successfully logged in',
                    token,
                });
            } else {
                res.status(401).json({
                    message: 'Password mismatch',
                });
            }
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({
            error: error,
        });
    }
};