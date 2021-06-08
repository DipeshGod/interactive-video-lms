import { Request, Response } from 'express';
import { ICourseRepository } from '../../interfaces/repositories/ICourseRepository';
import { BaseController } from '../BaseController';

export class GetCourseController extends BaseController {
  private courseRepository: ICourseRepository;

  constructor(courseRepository: ICourseRepository) {
    super();
    this.courseRepository = courseRepository;
  }

  protected async executeImpl(
    req: Request,
    res: Response
  ): Promise<void | any> {
    try {
      const courses = await this.courseRepository.getCourse();
      return this.ok(res, courses);
    } catch (err: any) {
      return this.fail(res, err.toString());
    }
  }
}
