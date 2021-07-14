import { Request, Response } from "express";
import { IUserEnrolledRepository } from "../../interfaces/repositories/IUserEnrolledRepository";
import { BaseController } from "../BaseController";

export class GetUserEnrolledController extends BaseController {
    private userEnrolledRepository: IUserEnrolledRepository;

    constructor(userEnrolledRepository: IUserEnrolledRepository) {
        super();
        this.userEnrolledRepository = userEnrolledRepository;
    }

    protected async executeImpl(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const userEnrolled = await this.userEnrolledRepository.getUserEnrolled(id);
            return this.ok(res, userEnrolled);
        } catch (err: any) {
            return this.fail(res, err);
        }
    }
}