import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/models/User';
import { User } from './../models/User';

const authentication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({
            message: "Please, Login."
        })
        const decoded: any = await jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
        const loggedInUser = await User.findById(decoded.id);
        if (!loggedInUser) return res.status(401).json({
            message: "User with provided token is removed from system"
        })
        req.loggedInUser = loggedInUser;
        next();

    } catch (err: any) {
        throw new Error(err.toString());
    }
}

export { authentication };