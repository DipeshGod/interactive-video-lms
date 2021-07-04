import { Response, Request } from "express";
import { IExerciseRepository } from "./../../interfaces/repositories/IExerciseRepository";
import { BaseController } from "../BaseController";

export class GetExerciseController extends BaseController {
    private exerciseRepository: IExerciseRepository;

    constructor(exerciseRepository: IExerciseRepository) {
        super();
        this.exerciseRepository = exerciseRepository
    }

    protected async executeImpl(req: Request, res: Response) {
        try {
            const exercises = await this.exerciseRepository.getExercise(req.params.id);
            return this.ok(res, exercises);
        } catch (err: any) {
            return this.fail(res, err);
        }
    }
}