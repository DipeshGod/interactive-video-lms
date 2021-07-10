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
            const id = req.params.id;
            const category: any = req.query.category;
            const exercises = await this.exerciseRepository.getExercise(id, category);
            return this.ok(res, exercises);
            console.log('yaha aayo');

        } catch (err: any) {
            return this.fail(res, err);
        }
    }
}