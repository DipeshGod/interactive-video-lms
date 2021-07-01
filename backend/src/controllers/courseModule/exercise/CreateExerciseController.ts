import { Request, Response } from 'express';
import { ICourseModuleDoc } from '../../../interfaces/models/CourseModule';
import { ICourseModuleRepository } from '../../../interfaces/repositories/ICourseModuleRepository';
import { CourseModuleRepository } from '../../../repositories/CourseModuleRepository';
import { BaseController } from '../../BaseController';

export class CreateExerciseController extends BaseController {
  private courseModuleRepository: ICourseModuleRepository;

  constructor(courseModuleRepository: ICourseModuleRepository) {
    super();
    this.courseModuleRepository = courseModuleRepository;
  }


  protected async executeImpl(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const courseModule: any =
        await this.courseModuleRepository.getCourseModuleByModuleId(id);
      console.log('id:)', id);
      console.log('req.body:', req.body);
      console.log('course module:', courseModule);
      if (!courseModule.exercise) {
        courseModule.exercise = req.body.exercise;
      } else {
        courseModule.exercise.push(req.body);
      }
      // courseModule.exercise.push(req.body)
      console.log('after push:', courseModule);
      const updatedCourseModule =
        await this.courseModuleRepository.editCourseModule(
          courseModule._id,
          courseModule
        );
      return this.ok(res, updatedCourseModule);
    } catch (err: any) {
      console.log('err:', err);
      return this.fail(res, err);
    }
  }
}
