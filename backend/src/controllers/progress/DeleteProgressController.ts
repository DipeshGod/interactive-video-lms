import { Request, Response } from "express";
import { IProgressRepository } from "../../interfaces/repositories/IProgressRepository";
import { BaseController } from "../BaseController";

export class DeleteProgressController extends BaseController {
    private progressRepository: IProgressRepository

    constructor(progressRepository: IProgressRepository) {
        super();
        this.progressRepository = progressRepository;
    }

    protected async executeImpl(req: Request, res: Response) {
        try {
            const progress = await this.progressRepository.removeProgress(req.params.id);
            return this.ok(res, progress);
        } catch (err: any) {
            return this.fail(res, err);
        }
    }
}