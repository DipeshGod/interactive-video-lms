import { NextFunction, Request, Response } from "express";

const isSuperAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.loggedInUser?.type === 'superAdmin')
        return next();

    return res.status(401).json({
        message: 'Your are not authorize to access this page'
    })
}


const isEnterprise = (req: Request, res: Response, next: NextFunction) => {
    if (req.loggedInUser?.type === 'enterprise')
        return next();

    return res.status(401).json({
        message: 'Your are not authorize to access this page'
    })
}

const isStudent = (req: Request, res: Response, next: NextFunction) => {
    if (req.loggedInUser?.type === 'student')
        return next();

    return res.status(401).json({
        message: 'Your are not authorize to access this page'
    })
}

export { isSuperAdmin, isEnterprise, isStudent }