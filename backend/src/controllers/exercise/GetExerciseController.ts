import { Response, Request } from 'express';
import { IExerciseRepository } from './../../interfaces/repositories/IExerciseRepository';
import { BaseController } from '../BaseController';

export class GetExerciseController extends BaseController {
  private exerciseRepository: IExerciseRepository;

  constructor(exerciseRepository: IExerciseRepository) {
    super();
    this.exerciseRepository = exerciseRepository;
  }

  protected async executeImpl(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const category: any = req.query.category;
      const { page, limit }: any = req.query;

      let exercises;

      if (page && limit) {
        let count = await this.exerciseRepository
          .getExercise(id, category)
          .countDocuments();

        exercises = await this.exerciseRepository
          .getExercise(id, category)
          .limit(limit * 1)
          .skip((page - 1) * limit);

        return this.ok(res, {
          exercises,
          totalPages: Math.ceil(count / limit),
          currentPage: Number(page),
        });
      }

      exercises = await this.exerciseRepository.getExercise(id, category);

      return this.ok(res, exercises);
    } catch (err: any) {
      return this.fail(res, err);
    }
  }
}
