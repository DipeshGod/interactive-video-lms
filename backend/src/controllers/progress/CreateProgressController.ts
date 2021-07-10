import { Request, Response } from "express";
import { IProgressRepository } from "../../interfaces/repositories/IProgressRepository";
import { BaseController } from "../BaseController";

export class CreateProgressController extends BaseController {
    private progressRepository: IProgressRepository

    constructor(progressRepository: IProgressRepository) {
        super();
        this.progressRepository = progressRepository;
    }

    protected async executeImpl(req: Request, res: Response) {
        try {
            const progress = await this.progressRepository.createProgress(req.body);
            return this.ok(res, progress);
        } catch (err: any) {
            return this.fail(res, err);
        }
    }
}