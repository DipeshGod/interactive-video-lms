import { Request, Response } from "express";
import { BaseController } from "../BaseController"
import { IUserRepository } from './../../interfaces/repositories/IUserRepository';

export class GetUserByIdController extends BaseController {
    private userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        super();
        this.userRepository = userRepository
    }

    protected async executeImpl(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const user = await this.userRepository.getUserById(id);
            return this.ok(res, user);
        } catch (err: any) {
            return this.fail(res, err);
        }
    }
}