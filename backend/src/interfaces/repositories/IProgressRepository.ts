import { Query } from "mongoose";
import { IStudentProgress, IStudentProgressDoc } from "../models/Progress";

export interface IProgressRepository {
  createProgress(progressData: any): Promise<IStudentProgressDoc>;
  getProgress(
    userId: any
  ): Query<IStudentProgressDoc[], IStudentProgressDoc, {}>;
  getModuleProgress(queryData: any): any;
  editPreTest(
    queryData: any,
    progressData: any
  ): Query<IStudentProgressDoc | null, IStudentProgressDoc, {}>;
  editModule(moduleProgressId: any, progressData: any): any;
  removeProgress(
    id: string
  ): Query<IStudentProgressDoc | null, IStudentProgressDoc, {}>;
}
