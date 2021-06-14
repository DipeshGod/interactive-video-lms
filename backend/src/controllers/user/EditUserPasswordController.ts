import { Request, Response } from "express";
import { IUserRepository } from "../../interfaces/repositories/IUserRepository";
import { checkPassword, hashPassword } from "../../services/bcrypt";
import { BaseController } from "../BaseController";


export class EditUserPasswordController extends BaseController {
    private userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        super();
        this.userRepository = userRepository;
    }

    protected async executeImpl(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const user = await this.userRepository.getUserByIdWithPassword(id);
            if (!user) return this.fail(res, 'User not found');
            if (!checkPassword(req.body.oldPassword, user.password))
                return this.forbidden(res, 'old password does not match');
            const password = hashPassword(req.body.newPassword);
            const updatedUser = await this.userRepository.editUser(user._id, { password: password })
            return this.ok(res, updatedUser);
        } catch (err: any) {
            return this.fail(res, err);
        }
    }
}