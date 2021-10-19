import { Request, Response } from "express";
import { ICourseModuleRepository } from "../../interfaces/repositories/ICourseModuleRepository";
import { IExerciseRepository } from "../../interfaces/repositories/IExerciseRepository";
import { BaseController } from "../BaseController";

export class CreateExerciseController extends BaseController {
  private exerciseRepository: IExerciseRepository;
  private courseModuleRepository: ICourseModuleRepository;

  constructor(
    exerciseRepository: IExerciseRepository,
    courseModuleRepository: ICourseModuleRepository
  ) {
    super();
    this.exerciseRepository = exerciseRepository;
    this.courseModuleRepository = courseModuleRepository;
  }

  protected async executeImpl(req: Request, res: Response) {
    try {
      const exercise = await this.exerciseRepository.createExercise(req.body);
      const courseModule = await this.courseModuleRepository.editCourseModule(
        exercise.association,
        { hasExercise: true }
      );
      console.log("courseModule:", courseModule);
      return this.ok(res, exercise);
    } catch (err: any) {
      return this.fail(res, err);
    }
  }
}
