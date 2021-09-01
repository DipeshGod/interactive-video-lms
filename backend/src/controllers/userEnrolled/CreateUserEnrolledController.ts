import { Request, Response } from 'express';
import { any } from 'joi';
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

  protected async executeImpl(req: Request, res: Response) {
    try {
      // 1. check if user is already enrolled to a course
      const { userId, courseId } = req.body;
      const userEnrolls = await this.userEnrolledRepository.checkUserEnrolled(
        userId,
        courseId
      );
      // 2. If already enrolled, return response already enrolled
      if (userEnrolls)
        return this.forbidden(res, 'user is already enrolled in this course');

      // 3. If not enrolled,
      // 3a. Enroll user the course by creating user enrolled document
      const courseModules =
        await this.courseModuleRepository.getCourseModuleByCourseId(courseId);
      const currentModule = courseModules[0]._id;
      const userEnrolled = await this.userEnrolledRepository.createUserEnrolled(
        { user: userId, course: courseId, currentModule }
      );

      // 3b. Create Module Progress schema for each module
      const moduleProgresses: any = [];
      courseModules.map((module: any) => {
        const moduleProgress = {
          title: module.title,
          score: 0,
          solvedQuestions: 0,
          totalQuestions: 0,
        };
        moduleProgresses.push(moduleProgress);
      });
      // 3c. Create Progress document
      const progress = {
        user: userId,
        course: courseId,
        moduleProgress: moduleProgresses,
      };
      await this.progressRepository.createProgress(progress);

      // 4. Return response user enrolled to the course
      return this.ok(res, userEnrolled);
    } catch (err: any) {
      return this.fail(res, err);
    }
  }
}
