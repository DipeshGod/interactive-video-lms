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
      // 2. If already enrolled, return response already enrolled
      // 3. If not enrolled,
      // 3a. Enroll user the course by creating user enrolled document
      // 3b. Create Module Progress document for each module
      // 3c. Create Progress document
      // 4. Return response user enrolled to the course
    } catch (err: any) {
      return this.fail(res, err);
    }
  }
}
