import { Query } from 'mongoose';
import { ICourseModule, ICourseModuleDoc } from '../models/CourseModule';

export interface ICourseModuleRepository {
  createCourseModule(
    courseModuleData: ICourseModule
  ): Promise<ICourseModuleDoc>;
}
