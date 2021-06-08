import { Request, Response } from 'express';
import { ICourseRepository } from '../../interfaces/repositories/ICourseRepository';
import { BaseController } from '../BaseController';
import path from 'path';

export class CreateCourseController extends BaseController {
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
      const course = await this.courseRepository.createCourse(req.body);
      return this.ok(res, course);
    } catch (err: any) {
      return this.fail(res, err.toString());
    }
  }
}
