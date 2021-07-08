import { Request, Response } from "express";
import { BaseController } from "../BaseController";

export class LogoutController extends BaseController {
    constructor() {
        super();
    }

    protected async executeImpl(req: Request, res: Response) {
        try {
            if (!req.cookies)
                return this.ok(res, { message: 'Logout Success' });
            console.log('req.cookies before:', req.cookies);
            res.clearCookie('token',);
            console.log('req.cookies:', req.cookies);
            return this.ok(res, { message: 'Logout Success' });
        } catch (err: any) {
            return this.fail(res, err);
        }
    }
}