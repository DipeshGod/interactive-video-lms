import { Request, Response } from "express";
import { IUserRepository } from "../../interfaces/repositories/IUserRepository";
import { BaseController } from "../BaseController";

export class EditUserInfoController extends BaseController {
    private userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        super();
        this.userRepository = userRepository;
    }

    protected async executeImpl(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const updatedUser = await this.userRepository.editUser(id, req.body);
            return this.ok(res, updatedUser);
        } catch (err: any) {
            return this.fail(res, err);
        }
    }
}