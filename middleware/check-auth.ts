import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend the Request interface to include a userData property
declare global {
    namespace Express {
        interface Request {
            userData?: any; // Adjust the type accordingly
        }
    }
}

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                message: 'Unauthorized',
            });
        }

        const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET as string);
        req.userData = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Unauthorized',
            error: error,
        });
    }
};
