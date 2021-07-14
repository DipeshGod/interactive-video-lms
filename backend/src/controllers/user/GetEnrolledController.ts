import { Request, Response } from "express";
import { IUserEnrolledRepository } from "../../interfaces/repositories/IUserEnrolledRepository";
import { IUserRepository } from "../../interfaces/repositories/IUserRepository";
import { BaseController } from "../BaseController"


export class GetEnrolledController extends BaseController {
    private userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        super();
        this.userRepository = userRepository
    }

    protected async executeImpl(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const user = await this.userRepository.getEnrolledCourses(id);
            return this.ok(res, user);
        } catch (err: any) {
            return this.fail(res, err);
        }
    }
}