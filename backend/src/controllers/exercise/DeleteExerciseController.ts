import { Request, Response } from "express";
import { IExerciseRepository } from "../../interfaces/repositories/IExerciseRepository";
import { BaseController } from "../BaseController";

export class DeleteExerciseController extends BaseController {
    private exerciseRepository: IExerciseRepository;

    constructor(exerciseRepository: IExerciseRepository) {
        super();
        this.exerciseRepository = exerciseRepository;
    }

    protected async executeImpl(req: Request, res: Response) {
        try {
            const deletedExercise = await this.exerciseRepository.deleteExercise(req.params.id);
            return this.ok(res, deletedExercise);
        } catch (err: any) {
            return this.fail(res, err);
        }
    }
}