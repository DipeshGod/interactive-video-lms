import { Query } from 'mongoose';
import { ICourse, ICourseDoc } from '../models/Course';

export interface ICourseRepository {
  getCourse(): Query<ICourseDoc[], ICourseDoc, {}>;
  createCourse(courseData: ICourse): Promise<ICourseDoc>;
  getCourseById(id: String): Query<ICourseDoc | null, ICourseDoc, {}>;
  deleteCourse(id: String): Query<ICourseDoc | null, ICourseDoc, {}>;
  editCourse(id:String,courseData: ICourse):Query<ICourseDoc | null, ICourseDoc, {}>;
}
