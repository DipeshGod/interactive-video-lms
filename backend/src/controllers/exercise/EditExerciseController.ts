import { Request, Response } from "express";
import { IExerciseRepository } from "../../interfaces/repositories/IExerciseRepository";
import { BaseController } from "../BaseController";

export class EditExerciseController extends BaseController {
  private exerciseRepository: IExerciseRepository;

  constructor(exerciseRepository: IExerciseRepository) {
    super();
    this.exerciseRepository = exerciseRepository;
  }

  protected async executeImpl(req: Request, res: Response) {
    try {
      const exercise = await this.exerciseRepository.editExercise(
        req.params.id,
        req.body
      );
      return this.ok(res, exercise);
    } catch (err: any) {
      return this.fail(res, err);
    }
  }
}
