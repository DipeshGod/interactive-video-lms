import { Request, Response } from 'express';
import { IStudentProgress } from '../../interfaces/models/Progress';
import { ICourseModuleRepository } from '../../interfaces/repositories/ICourseModuleRepository';
import { IProgressRepository } from '../../interfaces/repositories/IProgressRepository';
import { BaseController } from '../BaseController';
import { IUserEnrolledRepository } from './../../interfaces/repositories/IUserEnrolledRepository';

export class CreateUserEnrolledController extends BaseController {
  private userEnrolledRepository: IUserEnrolledRepository;
  private progressRepository: IProgressRepository;
  private courseModuleRepository: ICourseModuleRepository;

  constructor(
    userEnrolledRepository: IUserEnrolledRepository,
    progressRepository: IProgressRepository,
    courseModuleRepository: ICourseModuleRepository
  ) {
    super();
    this.userEnrolledRepository = userEnrolledRepository;
    this.progressRepository = progressRepository;
    this.courseModuleRepository = courseModuleRepository;
  }

  private createUserModuleProgress = async (
    courseId: string,
    userId: string
  ) => {
    try {
      const progress = {
        user: userId,
        course: courseId,
        module: [],
      };
      // get all course module
      const courseModules =
        await this.courseModuleRepository.getCourseModuleByCourseId(courseId);

      //intitiate user progress without moduleProgress
      const userProgress = await this.progressRepository.createProgress(
        progress
      );

      if (!userProgress)
        throw new Error('Error while creating user progress at beggining');
      /* 1. courseModule lai map garera
   2. [module]={title,id}
   3. create at once with module
*/
      courseModules.map((module) => {
        const moduleProgress = { id: module._id, title: module.title };
        console.log('module:', module);
      });
      // console.log('courseModules:', courseModules);
    } catch (err: any) {
      throw new Error(err.toString());
    }
  };

  protected async executeImpl(req: Request, res: Response) {
    try {
      //check if user is already enrolled in a course
      const isUserAlreadyEnrolled =
        await this.userEnrolledRepository.checkUserEnrolled(
          req.body.userId,
          req.body.courseId
        );
      //if already enrolled return isUserEnrolled=true
      if (isUserAlreadyEnrolled !== null)
        return this.ok(res, { isUserEnrolled: true });
      //else enroll user to a course
      const userEnrolled = await this.userEnrolledRepository.createUserEnrolled(
        req.body
      );
      //after enrolling initiate user progress on different modules(module progress)
      if (userEnrolled) {
        const progress = await this.createUserModuleProgress(
          userEnrolled.course,
          userEnrolled.user
        );
      }
      // console.log('progress:', progress);
      return this.ok(res, userEnrolled);
    } catch (err: any) {
      return this.fail(res, err);
    }
  }
}
