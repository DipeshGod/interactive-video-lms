import { Request, Response } from "express";
import { IExerciseRepository } from "../../interfaces/repositories/IExerciseRepository";
import { BaseController } from "../BaseController";

export class CreateExerciseController extends BaseController {
    private exerciseRepository: IExerciseRepository;

    constructor(exerciseRepository: IExerciseRepository) {
        super();
        this.exerciseRepository = exerciseRepository;
    }

    protected async executeImpl(req: Request, res: Response) {
        try {
            const quiz = await this.exerciseRepository.createExercise(req.body);
            return this.ok(res, quiz);
        } catch (err: any) {
            return this.fail(res, err);
        }
    }
}