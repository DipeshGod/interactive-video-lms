import { Query } from 'mongoose';
import { ICourseModule, ICourseModuleDoc } from '../models/CourseModule';

export interface ICourseModuleRepository {
  createCourseModule(courseModuleData: ICourseModule): Promise<ICourseModuleDoc>;
  getCourseModuleById(id: string):  Query<ICourseModuleDoc[], ICourseModuleDoc, {}>;
  editCourseModule(id: string, moduleData: ICourseModuleDoc):  Query<ICourseModuleDoc | null, ICourseModuleDoc, {}>;
  deleteCourseModule(id: string):  Query<ICourseModuleDoc | null, ICourseModuleDoc, {}>;
}
