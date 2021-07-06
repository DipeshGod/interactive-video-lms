import { Query } from 'mongoose';
import { ICourseModule, ICourseModuleDoc } from '../models/CourseModule';

export interface ICourseModuleRepository {
  createCourseModule(courseModuleData: ICourseModule): Promise<ICourseModuleDoc>;
  getCourseModuleByCourseId(id: string): Query<ICourseModuleDoc[], ICourseModuleDoc, {}>;
  editCourseModule(id: string, moduleData: ICourseModuleDoc | any): Query<ICourseModuleDoc | null, ICourseModuleDoc, {}>;
  deleteCourseModule(id: string): Query<ICourseModuleDoc | null, ICourseModuleDoc, {}>;
  getCourseModuleByModuleId(id: string): Query<ICourseModuleDoc | null, ICourseModuleDoc, {}>;
}
