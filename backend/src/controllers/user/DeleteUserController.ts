import { Request, Response } from "express";
import { IUserRepository } from "../../interfaces/repositories/IUserRepository";
import { BaseController } from "../BaseController";

export class DeleteUserController extends BaseController {
    private userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        super();
        this.userRepository = userRepository;
    }

    protected async executeImpl(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const removedUser = await this.userRepository.deleteUser(id);
            return this.ok(res, removedUser);
        } catch (err: any) {
            return this.fail(res, err);
        }
    }
}