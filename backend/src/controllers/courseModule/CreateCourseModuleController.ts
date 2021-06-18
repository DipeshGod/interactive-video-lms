import { Request, Response } from 'express';
import { ICourseModuleRepository } from '../../interfaces/repositories/ICourseModuleRepository';
import { BaseController } from '../BaseController';

export class CreateCourseModuleController extends BaseController {
  private courseModuleRepository: ICourseModuleRepository;

  constructor(courseModuleRepository: ICourseModuleRepository) {
    super();
    this.courseModuleRepository = courseModuleRepository;
  }

  protected async executeImpl(req: Request, res: Response) {
    try {
      let quizes: any = [];
      req.body.quizes.forEach((quiz: any) => {
        let data: any = {};
        data.question = quiz.data[0];
        data.options = quiz.data[1].split('/');
        data.answer = quiz.data[2];
        quizes.push(data);
      });
      req.body.quizes = quizes;
      const courseModule = await this.courseModuleRepository.createCourseModule(
        req.body
      );
      return this.ok(res, courseModule);
    } catch (err: any) {
      return this.fail(res, err.toString());
    }
  }
}
