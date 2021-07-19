import { IStudentProgress } from '../models/Progress';

export interface IProgressRepository {
  createProgress(progressData: IStudentProgress): any;
  getProgress(courseId: string, userId: string): any;
  editProgress(queryData: any, progressData: IStudentProgress): any;
  removeProgress(id: string): any;
}
