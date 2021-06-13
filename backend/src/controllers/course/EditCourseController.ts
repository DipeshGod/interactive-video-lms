import { Request, Response } from 'express';
import { ICourseRepository } from '../../interfaces/repositories/ICourseRepository';
import { BaseController } from '../BaseController';

export class EditCourseController extends BaseController {
  private courseRepository: ICourseRepository;

  constructor(courseRepository: ICourseRepository) {
    super();
    this.courseRepository = courseRepository;
  }

  protected async executeImpl(
    req: Request,
    res: Response
  ){
    try {
      let course: any = await this.courseRepository.editCourse(
        req.params.id,
        req.body
      );
      return this.ok(res, course);
    } catch (err: any) {
      return this.fail(res, err.toString());
    }
  }
}
